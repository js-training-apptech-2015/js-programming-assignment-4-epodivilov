# JS Programming assignment 4
---
## Task 1
Create a constructor (`ObjectWithMethodOverloading`) that would produce objects with an `overload` method that adds 'overloaded' method implementations to this object. 
`.overload` decides which implementation to use based on 1) number of arguments, 2) arguments' types
Consider the following examples:
### example 1
```javascript
var o = new ObjectWithMethodOverloading();
function get() {
    return this._value;
}
function set(x) {
    this._value = x;
]
o.overload('value', get);
o.overload('value', set);

o.value(123);
var value = o.value(); // value === 123
```
### example 2
```
var o = new ObjectWithMethodOverloading();
function multSq(n) {
    return n * n;
}
o.overload('mult', multSq);

function multNumbers(n1, n2) {
    return n1 * n2;
}
o.overload('mult', multNumbers, [Number, Number]);

function multStringAndNumber(s, n) {
    return Array(n).fill(s).join(''); // forgive me, IE
}
o.overload('mult', multStringAndNumber, [String, Number]);
var res0 = o.mult(3); // res0 === 9
var res1 = o.mult(2,3); // res1 === 6
var res2 = o.mult('ab',3); // res === 'ababab'
```

### Assumptions
* a modern environment Chrome, FF or Edge

---
## Task 2
Implement an AMD module loader.
There should be a global function `define`, that accepts an array of Strings (dependencies) and a callback function, that gets executed when all the dependencies are loaded:
```javascript
function define(['add.file.js', 'widgets/dep2.file.js'], function(dep1, dep2) {
    function add(x, y) {
        return Number(x) + Number(y);
    }
    return add;
});
```
The export is a returning value of the call back function

### Assumptions
* a modern environment Chrome, FF or Edge: [Promises](http://caniuse.com/#search=Promise)

### Challenge (not obligatory)
extend the loader so that it is capable of loading not only JS AMD modules but any files (e.g. as text):
```javascript
function define(['text!my.text.file.txt', 'image!logo.png'], function(text, image) {
    console.log(text);
    return {};
});
```

## References:
* [Function Overloading](https://en.wikipedia.org/wiki/Function_overloading)
* [Array.prototype.fill](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
* [SCRIPT](https://developer.mozilla.org/ru/docs/Web/HTML/Element/script)
* [Promise](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise)
