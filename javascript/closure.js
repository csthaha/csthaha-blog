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



// 闭包、垃圾回收
function main() {
    let a = 1;
    let b = 2;
    let c = 3;
    return function foo() {
        return c;
    }
}

let d = main()

// 在 javascript 中，闭包使得一个函数可以访问其外部作用域的变量。在上面例子中，
// foo 函数就是一个闭包，因为它能访问其外部作用于 main 中的变量 c。
// 在 main 函数执行完毕之后，a、b、c 三个变量通过会在栈中。由于 foo 函数引用了
// 变量 c ，所以 v8引擎会将 c 变量存储在堆中。这是因为 javascript 的垃圾回收机制
// 是基于 引用计数和标记-清除 算法的，它需要确保被引用的变量不会被回收。
// 至于何时会回收变量 c 。这取决于 foo 函数的引用是否仍然存在。上述例子中，因为变量 d
// 引用了 foo 函数， 所以只要 d 仍然存在并引用 foo ，c 就不会被回收。因为它仍然被 foo 引用
// 当 d 的引用被删除后或者指向其他对象时（将其他值复制给 d），foo 函数将不会被引用，这时候
// 垃圾回收器会识别到 foo 和 c 变量是否可以回收。并在下一次垃圾回收周期中将它们回收。
// 这个具体时间点是垃圾回收器决定的。无法精准预测。