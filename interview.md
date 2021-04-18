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

2. flex 布局的缺点
    浏览器兼容性比较差，只能兼容到ie9及以上。

3. rem
    优点：能维持整体的布局效果，移动端兼容性好，不用写多个 css 代码，而且还可以利用 @media进行优化。
    缺点：开头要引入一段 js 代码，单位写成 rem，计算 rem 比较麻烦

## akj
1. useState 在react 是同步还是异步

useState 在 react 中是异步的），因为 react 中的 useState 数据是批量更新的，也就是说当一个数据改变并不会立马渲染，
而是等好几个一起数据更新。（异步操作是为了提高性能，将多个状态合并一起更新，减少 re-render 调用）。

通过 addEventListener 添加的事件处理函数，还有通过 setTimeout / setInterval 是同步（即可以拿到结果）

2. b端是如何做权限管理的

[登录权限](https://juejin.cn/post/6844903478880370701)

1）登录：当用户填写完账号、密码后向服务端验证是否正确，验证通过之后，服务端会返回一个 token，拿到 token 之后（我会将这个 token 存贮到 cookie 中，保证刷新页面后能记住用户登录状态），前端会根据 token 再去拉取一个 user_info 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

2） 权限验证：通过 token 获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 router.addRouters 动态挂载这些路由。

这些数据和操作都是通过 vuex 全局管理控制的。（补充说明：刷新页面后 vuex 的内容也会丢失，所以需要重复上述的那些操作）

3. 数组去重 两个以上保留保留两个（遍历一次）

```javascript
function dealArray(arg) {
    const map = new Map(), res = []
    for(let i =0 ;i < arg.length;i++)  {
        if(map.get(arg[i])) {
            map.set(arg[i],map.get(arg[i])+1)
            map.get(arg[i]) == 2 && res.push(arg[i])

        }else {
            map.set(arg[i],1)
            res.push(arg[i])
        }
    }
    return res
}

console.log(dealArray([1,2,3,1,2,3,2,2,5,6,5,5,5]))
// [1, 2, 3, 1, 2, 3, 5, 6, 5]
```

## ty
1. proxy 原理
[proxy响应式原理](https://www.jianshu.com/p/c440aac3ab1a)
首先利用 compositionAPI 中的 reactive() 函数返回一个 proxy 对象，使得数据可监测。
```javascript
// reactive() 函数接受一个普通对象 返回一个响应式数据对象
function reactive(target) {
  // 通过proxy将对象变为响应式
  const observed = new Proxy(target, baseHandler);
  //  返回proxy代理后的对象
  return observed;
}
// target 为需要拦截的目标对象
// baseHandler 也是一个对象，用来定制拦截行为。
//     定义拦截的get set方法，监测和改写数据，为了方便，我们需要先将所有依赖收集起来，一旦数据发生变化，就统一通知更新。就是典型的“发布订阅者”模式，数据变化为“发布者”，依赖对象为“订阅者”。

const baseHandler = {
 get(target, key) {
   // Reflect.get
   const res = Reflect.get(target, key);
   // @todo 依赖收集
   // 尝试获取值obj.age，触发getter
   track(target, key);
   return typeof res === "object" ? reactive(res) : res;
 },
 set(target, key, val) {
   const info = { oldValue: target[key], newValue: val };
   // Reflect.set
   // target[key] = val;
   const res = Reflect.set(target, key, val);
   // @todo 响应式去通知变化 触发执行，effect函数是响应式对象修改触发的
   trigger(target, key, info);
 },
};

// Reflect作用：优化Object的一些操作方法以及合理的返回Object操作返回的结果。
```

proxy 实现响应式优点：
 - Proxy 原生支持监听数组，非常方便
 - Proxy 可以监听到新增、删除属性
 - 在面对庞大对象时，不会一次性递归到底，默认只会代理第一层。当访问到对象属性或数组属性时才会进一步监听，效率更高。
缺点：
    兼容性稍差一点。    

2. Object.create 、 Object.assign

Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象，返回目标对象。
```javascript
// 语法： Object.assign(target, ...sources) target 可以不写（或空对象{}） 实现浅拷贝
// 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

const source = {a: 1, b: 2}
const source2 = {b: 3, c: 4}

const res = Object.assign(...[source, source2]) // {a: 1, b: 3, c: 4}
// const res = Object.assign({}, ...[source, source2]) // {a: 1, b: 3, c: 4}

```

Object.create() 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__.
`newObj.__proto === curObj`
```javascript
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.__proto__ === person // true
me // {}
me.isHuman = true
me // {isHuman: true}
person //不变
```

3. computed watch区别 

computed 是计算属性，它会根据所依赖的数据动态显示新的计算结果，该计算结果会被缓存起来。computed的值在 getter 执行后是会缓存的，只有在它依赖的属性改变之后，下一次获取 computed 的值时才会重新调用对应的 getter 来计算。

watch： watch 更像是一个 data 的数据监听回调，当依赖的 data 的数据变化，执行回调，在方法中会传入 newVal 和 oldVal。可以提供输入值无效....xsssss

如果一个数据依赖于其他数据，那么把这个数据设计为 computed，
如果你需要在某个数据变化的时候做一些事情，使用 watch 来观察这个数据变化

4. 两个 tab 标签页之间 session 是否可以共享

localStorage 的生命周期是永久的，意思就是如果不主动清除，存储的数据将一直被保存。
而 sessionStorage （会话窗口） 顾名思义是针对一个 session 的数据存储，生命周期为当前窗口，一旦窗口关闭，那么存储的数据将被清空。最后还有一个很重要的区别同一浏览器的相同域名和端口的不同页面间可以共享相同的 localStorage，但是不同页面间无法共享 sessionStorage 的信息。

5. 模块

应该要问的 es6 的模块
es6 之前：实现模块化使用的是 RequireJS 或者 seaJS (分别是基于 AMD 规范的模块化库，和基于 CMD 规范的模块化库)

es6 引入了模块化，其设计思想是在编译时就能确定模块的依赖关系，以及输入和输出的变量。
es6 的模块化分为导出（export）@与导入（import）两个模块

6. class 继承 extends

[廖雪峰 cless 继承](https://www.liaoxuefeng.com/wiki/1022910821149312/1072866346339712)
