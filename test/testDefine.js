define(['text!testDefine.js', 'image!testImageDefine.png'], function(text, image) {
    document.getElementById('forText').innerHTML = text;
    document.getElementById('forImage').appendChild(image);
});