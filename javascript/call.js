// Function.prototype.call()
// 1. 实现继承
function Product(name, price) {
    this.name = name;
    this.price = price
}

function Food(n, p) {
    Product.call(this, n, p)
    this.category = 'Food'
}

var cheese = new Food('feta', 5)
console.log(cheese.name, '-', cheese.price) // feta - 5

// 2. 使用 call 方法调用函数并且指定上下文的 this
function greet() {
    var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
    console.log(reply)
}
var obj = {
    animal: 'cats', sleepDuration: '12 and 16 hours'
}

greet.call(obj) // cats typically sleep between 12 and 16 hours
greet.call()       // 不指定第一个参数或者第一个参数为 null this的值将会被绑定为全局对象。
greet.call(null)    //

// 实现 call
//  看 greet.call(obj) 例子
//     1. call 改变了 this 的指向，
//     2. 并且执行了greet 方法
//     联想到 this指向：作为对象的方法来使用的时候，this指向的是该 对象
//     如下：
var obj = {
    value: 'test',
    getValue: function() {
        console.log(this.value)
    }
}
obj.getValue() // test
// this 指向了 obj，方法也执行了，但是多了一个 getValue 的属性
// 所以实现步骤为： 1. 将函数设置为对象的属性；2. 执行函数； 3. 删除该属性
Function.prototype._call = function(context) {
    // 首先要获取调用call的函数，用this可以获取

    var context = context || globalThis; // call()未传或者 第一个参数传 null 则指向 window(node 环境中 gloabal)

    // 步骤1    创建函数
   context.fn = this;

   // 步骤2  调用 fn
   //(传参) 法一:
   //   var args = [...arguments].slice(1)
   //  context.fn(...args);

    // 法二: call 是 ES3 的方法，我们为了模拟实现一个 ES3 的方法，要用到ES6的方法，好像……，所以...
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args +')');    
    // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。入参必须为字符串
    
    // 问题1: this 参数可以传 null，当为 null 的时候，视为指向 window
    // 问题2: 函数是可以有返回值的！ (call() 方法的返回值：使用调用者提供的 this 和参数调用该函数的返回值。如果该方法没有返回值，则返回 undefined)

   // 步骤3 删除方法
   delete context.fn
   
   return result;   // 吐过函数有返回值的话 返回函数的返回值
}

// 测试一下
var foo = {
    value: 1
};
function bar(name, age) {
    console.log(this.value, '-', name, '-', age);
    return {
        value: this.value,
        name: name,
        age: age
    }
}
bar._call()// undefined
bar._call(foo, 'kevin', 23); // 1 - kevin -23
console.log(bar._call(foo, 'kevin', 23)) // { value: 1, name: 'kevin', age: 23 }