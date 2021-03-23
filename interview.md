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

## zkjn
1. [移动端 300 ms 延迟，点击穿透问题](https://www.jianshu.com/p/6e2b68a93c88)
- 解决移动端 300 ms 延迟：
    1. 禁用缩放功能
        `<meta name="viewport" content="user-scalable=no">`
            表明这个页面是不可被缩放的，那么双击缩放的功能是没有意义了，此时浏览器可以禁用默认的双击缩放行为并且去掉300ms的点击延迟。
        缺点：
            必须通过完全禁用缩放来达到去掉点击延迟的目的，然而完全禁用缩放并不是我们的初衷，我们只是想禁掉默认的双击缩放行为，这样就不用等待300ms来判断当前操作是否是双击。但是通常情况下，我们还是希望页面能通过双指缩放来进行缩放操作，比如放大一张图片，放大一段很小的文字。
    
    2. 更改默认的视口宽度
        `<meta name="viewport" content="width=device-width">`
            由于很多站点都已经对移动端坐过适配和优化了，这个时候就不需要双击缩放了，如果能够识别出一个网站是响应式的网站，那么移动端浏览器就可以自动禁掉默认的双击缩放行为并且去掉300ms的点击延迟。
- 点击穿透现象
    > 移动端300ms 的延迟，移动端事件的执行顺序：touchstart > touchend > click。
    假如页面上有两个元素A和B。B元素在A元素之上。我们在B元素的touchstart事件上注册了一个回调函数，该回调函数的作用是隐藏B元素。我们发现，当我们点击B元素，B元素被隐藏了，随后，A元素触发了click事件。

    这是因为在移动端浏览器，事件执行的顺序是touchstart > touchend > click。而click事件有300ms的延迟，当touchstart事件把B元素隐藏之后，隔了300ms，浏览器触发了click事件，但是此时B元素不见了，所以该事件被派发到了A元素身上。如果A元素是一个链接，那此时页面就会意外地跳转。

    1. fastclick
        首先引入fastclick库，再把页面内所有touch事件都换成click
    2. 只用 touch 或者 只用 click
    3. tap后延迟350ms再隐藏mask