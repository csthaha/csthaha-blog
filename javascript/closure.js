// function fn1() {
//     let a = 1;
//     return function fn2() {
//         a++;
//         console.log(a)
//     }
// }

// var f = fn1()

// f()
// f()
// f()

// 闭包的两个应用示例：
// 1. getter， setter 函数  (我认为应该是模块)
var getValue, setValue;

(function() {
    var secret = 0;
    getValue = function() {
        return secret;
    }

    setValue = function(v) {
        if(typeof v === "number") {
            secret = v + 1;
        }
        if(typeof v === "string") {
            secret = 'I am ' + v
        }
    }
}())

console.log(getValue())

setValue(123)
console.log('加1：',getValue())

setValue('cst')
console.log('string', getValue())

// 2. 迭代
function setup(x) {
    var i = 0
    return function() {
        return x[i++]
    }
}

var next = setup([1,2,3,4,5])

console.log(next())     // 闭包保存了 i 的值
console.log(next())
console.log(next())

var a = 1;

function f() {
    function n() {
        console.log(a)
    }
    var a = 2
    n();
}

f()