var mainScript = document.getElementsByTagName('script')[0].getAttribute('data-main');
var urlServer = window.location.protocol + "//" + window.location.host + (/(.*)\/.*/.exec(window.location.pathname)[1]);

function uploadJS(file) {
    return new Promise(function (resolve, reject) {
        var includeFile = document.createElement('script');
        includeFile.src = file;
        var module = (file.split('\\').pop().split('/').pop().split('.'))[0];

        includeFile.addEventListener('load', function() {
            resolve(module);
        }, false);

        includeFile.addEventListener('error', function() {
            reject(module);
            console.log('error');
        }, false);

        document.head.appendChild(includeFile);
    });
}

function uploadTXT(file) {
    return new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        var url = urlServer + '/' + file;
        var module = (file.split('\\').pop().split('/').pop().split('.'))[0];

        xmlhttp.open("GET", url, true);

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    window[module] = xmlhttp.responseText;
                    resolve(module);
                } else {
                    var error = new Error(xmlhttp.statusText);
                    error.code = xmlhttp.status;
                    reject(error);
                }
            }
        };

        xmlhttp.send();
    });
}

function uploadIMG(file) {
    return new Promise(function (resolve) {
        var newIMG = document.createElement('img');
        var module = (file.split('\\').pop().split('/').pop().split('.'))[0];
        newIMG.src = file;
        window[module] = newIMG;
        resolve(module);
    });
}

function define() {
    var callback;
    var dependencies;

    if(typeof arguments[0] == 'function') {
        callback = arguments[0];
        var script = (document.currentScript) ? document.currentScript.src : mainScript;
        var module = (script.split('\\').pop().split('/').pop().split('.'))[0];
        window[module] = callback.apply(this,Array.prototype.slice.call(arguments, 1));
    } else {
        dependencies = arguments[0];
        var callback2 = arguments[1];
        var promises = [];
        dependencies.forEach(function (file) {
            if(file.indexOf('text!') != -1) {
                promises.push(uploadTXT(file.replace('text!','')));
            } else if(file.indexOf('image!') != -1) {
                promises.push(uploadIMG(file.replace('image!','')));
            } else {
                promises.push(uploadJS(file));
            }
        });

        Promise.all(promises).then(function (results) {
            console.log(results);
            var args = [];
            results.forEach(function (module) {
                args.push(window[module]);
            });
            window[module] = callback2.apply(this, args);
        });
    }
}