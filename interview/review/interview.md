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