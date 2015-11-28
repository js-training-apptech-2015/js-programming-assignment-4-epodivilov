function ObjectWithMethodOverloading() {
    this.__funcArray = [];
}

ObjectWithMethodOverloading.prototype.overload = function (name, func, typeArray) {
    var arr = [func, typeArray];
    this.__funcArray.push(arr);
    this[name] = function t() {
        var listOfFunction = this.__funcArray;
        var args = arguments;
        for (var i = 0; i < listOfFunction.length; i++) {
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
    };
};

var a = new ObjectWithMethodOverloading();

function get() {
    return this._value;
}

function set(x) {
    this._value = x;
}

a.overload('value', get);
a.overload('value', set);


a.value(123);
var value = a.value();

console.log(a._value);
console.log(value);

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

console.log(res0);
console.log(res1);
console.log(res2);