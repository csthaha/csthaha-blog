# Interview

## zkr 笔试题
1. this指向
```javascript
// 1. this 指向问题
global.num = 90
this.age = 9
var num = 50, 
    age = 5
var obj = {
    num: 60,
    age: 6,
    getNum: function() {
        var num = 70;
        return this.num
    },

    getAge: () => {
        var age = 7;
        return this.age
    }
}
console.log(obj.getNum())   // 60
console.log(obj.getAge())   // 9  this 作为对象的方法使用， this 指向该对象。
// 但是该方法为箭头函数，this指向它外层的函数 为 全局下的 所以this 指向全局
console.log(obj.getNum.call(null)) // 90 call改变 this 指向，传入的第一个参数为 null， 所以this 指向全局
console.log(obj.getNum.call()) //90 如同第一个参数 传 null this 指向全局 
console.log(obj.getAge.call())  //9 call() 不传参数
console.log(obj.getNum.call({num: 20})) // 20 call 改变this 指向，指向参数对向
console.log(obj.getAge.call({num: 20})) // 9 箭头函数
```
2. 闭包+异步队列
```javascript
// 2. 闭包跟异步：setTimeout 外层输出 0 1 2 3 4（闭包一秒输出） 里面输出 5 5 5 5 5（每隔一秒）
for(var i = 0; i < 5; i++) {
    (function(a){
        console.log('--------',i)  // 输出 0 1 2 3 4（同步输出）
        setTimeout(function() {
            console.log('i is：',i)   // 每隔一秒 5 5 5 5 5
            console.log('a is：',a)  //  每隔一秒 0 1 2 3 4
            // 时间存储在异步队列中。如果外层函数未传入参数则未形成闭包，当同步事件执行完之后开始执行 的时候 i 已经为 5
            // 外层函数传入参数，则形成闭包 保存当时的值
        }, a * 1000)
    })(i)
}

```
3. var变量
```javascript
// 3. var 变量提升
if(!(m in global)){
    var m = 20;     // var 进行变量提示， 如何不使用 var 则会报错 m 未定义，变量提升之后 m in global 为 true
    console.log(111111)
} else {
    console.log(22222)
}
```