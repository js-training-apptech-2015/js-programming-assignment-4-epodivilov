function ObjectWithMethodOverloading() {
    this.__funcArray = [];
}

ObjectWithMethodOverloading.prototype.overload = function (name, func, typeArray) {
    var arr = [func, typeArray, name];
    this.__funcArray.push(arr);
    this[name] = function () {
        var listOfFunction = this.__funcArray;
        var args = arguments;
        for (var i = 0; i < listOfFunction.length; i++) {
            if(listOfFunction[i][2] == name) {
                if(listOfFunction[i][0].length == args.length) {
                    if(!listOfFunction[i][1]) {
                        return listOfFunction[i][0].apply(this,args);
                    } else {
                        var matchType = listOfFunction[i][1].every(function (element, index) {
                            return (typeof args[index] == typeof element());
                        });
                        if(matchType) {
                            return listOfFunction[i][0].apply(this,args);
                        }
                    }
                }
            }
        }
    };
};