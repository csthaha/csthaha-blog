# javascript

## var、let、const 区别
- var 和 let 用来声明 **变量**，const用于声明 **只读的常量**
- var 声明的变量，不存在块级作用域，在全局范围内都有效
- let 和 const 声明的，只在它所在的代码块内有效
- let 和 const 不存在像 var 一样的变量提升现象，所以 var 定义的变量可以先使用后声明，而let 和 const 只可先声明，后使用
- let 声明的变量存在暂时性死区，即只要块级作用域中存在 let，那么它所声明的变量就绑定了这个区域，不再受外部的影响。
- let 不允许在相同作用域内，重复声明同一个变量。例子如下：
```javascript
// 如下代码会报错
var name = 'cst'
{
    console.log(name)
    let name = 'chen'
}
```
- const 在声明变量时必须初始化赋值，一旦声明，其声明的值就不允许改变，更不允许重复声明；如 const 声明了一个复合类型的常量，**其存储的是一个引用地址，不允许改变的是这个地址，而对象本身是可以改变的。**

----

## new
> MDN：**new 运算符**创建一个用户定义的 <span style="color: #ea6f5a">对象类型的实例</span> 或具有 <span style="color: #ea6f5a">构造函数的内置对象的实例</span>。
```javascript
function car(model, year) {
    this.model = model;
    this.year = year;
}

// new 的语法： new Construtor([arguments])
const byd = new car('byd', 2020)

const lsls = {}
car.call(lsls, 'lsls', '2022')

console.log(byd.model,'-', byd.year);   // byd - 2020
console.log(lsls.model, '-', lsls.year) // lsls - 2022
```
语法：`new constructor([arguments])`

**constructor**: 一个指定对象实例的类型的类或函数。

**arguments**: 一个用于被 constructor 调用的参数列表。

描述：

如上：构造函数 car

new 关键字会进行如下操作：
1. 创建一个空的简单 Javascript 对象 （即 {}）  <span style="color: #ea6f5a"> byd = {} </span>
> const lsls = {} 实例形式可以理解创建了一个空对象

2. 链接该对象 （设置该对象的 constructor）到另一个对象  <span style="color: #ea6f5a"> 即绑定原型：byd.__proto__ = car.prototype</span>
> 由new 的描述和 new 创建的实例对象可以访问到构造函数中的属性和方法，就是 对象的__proto__属性指向构造函数的原型。在对象上查找属性时会顺着__proto__ 查找。

3. 将步骤 1 新建的对象作为 this 的上下文    <span style="color: #ea6f5a"> 调用 car 函数，并把空对象 byd 当作 this 传入， car.call(byd)</span>
> 代码 car.call(lsls, 'lsls', '2022') 理解将新建的对象作为 this 的上下文

4. 如果该函数没有返回对象，则返回 this  <span style="color: #ea6f5a">如果 car() 函数执行完，car 函数返回的是一个 object 类型，那么则返回它。如果构造函数返回的是基本类型，则不影响，还是返回this</span>
> 在构造函数中添加一个返回值可知，如果是对象：则返回该对象；如果不是则还是返回 this.

<span style="color: #ea6f5a; font-size: 18px">得出 myNew: </span>

```javascript
function myNew() {
    const obj = {},   // 创建一个空对象
          [constructor, ...args] = [...arguments];          // 将构造函数结构出来 即 new xxx()
    obj.__proto = constructor.prototype;    // 执行原型链接：实例对象的__proto__ 指向构造函数的prototype，通过__proto__ 向上访问
    const res = constructor.call(obj, ...args);    // 将 obj 作为 this 的上下文
    return typeof(res) === 'object' ? res : obj;    // 判断构造函数返回的是否是对象，是则返回它，不是则返回我们所创建的  obj
}

function car(model, year) {
    this.model = model;
    this.year = year;
}

const bc = myNew(car, 'bc', '2021')
console.log(bc, bc.model, '-', bc.year);    //{ __proto: {}, model: 'bc', year: '2021' } bc - 2021
```
------

## instanceof
> MDN: instanceof 运算符用于检测构造函数 `prototype` 属性是否出现在某个实例对象的原型链上。
> (实例的原型是否是构造函数)
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const cst = new Person('cst', 23)

console.log(cst instanceof Person)  // true instanceof 用于检测实例是否在构造函数的原型上
console.log(Person.prototype === cst.__proto__)     // true 构造函数的 prototype 是否出现在某个 实例的原型链上
```

instanceof 实现
```javascript

const myInstanceof = function (instance, constructor) {
    // let pro = constructor.prototype
    while(true) {
        if(instance === null) {
            return false
        }
        if( instance.__proto__ === constructor.prototype ) {
            return true
        }

        instance = instance.__proto__
    }
}

console.log(myInstanceof(cst, Person))  // true
```

## this 指向
> 在绝大多数情况下，函数的调用方式决定了 this 的值(运行时绑定). this 不能在执行期间被赋值，并且在每次函数被调用时 this 的值也可能不同。

**描述**：
1. <span style="color: #ea6f5a">全局上下文：</span>
> 无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象。
```javascript
// 在浏览器中，window 对象同时也是全局对象：
console.log(this === window); // true
a = 37;
console.log(window.a); // 37
this.b = "MDN";
console.log(window.b)   // "MDN"
console.log(b)      //"MDN"
```
2. <span style="color: #ea6f5a">bind 方法: </span>
> ECMAScript 引入了 Function.prototype.bind()。调用 f.bind(someObject)会创建一个与 f 具有相同函数体和作用域的函数，但是在这个新函数中，this 将永久被绑定到了 bind 的第一个参数，无论这个函数是如何被调用的。
```javascript
function f() {
    return this.a;
}
var g = f.bind({a: "azerty"});
console.log(g());   // azerty
var h = g.bind({a: 'yoo'})      // **bind只生效一次**
console.log(h())    // azerty
var o = {a: 37, f: f, g: g, h: h}
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
```

3. <span style="color: #ea6f5a">作为对象的方法: </span>
> 当函数作为对象里的方法被调用时，this 被设置为调用该函数的对象。

当 o.f() 被 **调用** 时，函数内的 this 将绑定到 o 对象。
```javascript
varo = {
    prop: 37,
    f: function() {
        return this.prop;
    }
}
console.log(o.f()); // 37

// 请注意， 这样的行为完全不会受函数定义方式或位置的影响。如下结果是一样的
var o = {prop: 37}
function fn() {
    return this.prop
}
o.f = fn()
console.log(o.f())  // 37

// 请注意
var prop = 'global'
varo = {
    prop: 37,
    f: function() {
        return this.prop;
    }
}

var g = varo.f
console.log(g());   // node 中 this undefined，所以undefined，浏览器中 global
```

4. <span style="color: #ea6f5a">作为构造函数: </span>
> 当一个函数用作构造函数时（使用 new 关键字），它的 this 被绑定到正在构造的新对象。
**虽然构造函数返回的默认值是 this 所指的那个对象，但它仍可以手动返回其他的对象（如果返回值不是一个对象，则返回 this 对象）** 就是 news 操作符的第四步
```javascript
/*
 * 构造函数这样工作:
 *
 * function MyConstructor(){
 *   // 函数实体写在这里
 *   // 根据需要在this上创建属性，然后赋值给它们，比如：
 *   this.fum = "nom";
 *   // 等等...
 *
 *   // 如果函数具有返回对象的return语句，
 *   // 则该对象将是 new 表达式的结果。
 *   // 否则，表达式的结果是当前绑定到 this 的对象。
 *   //（即通常看到的常见情况）。
 * }
 */
function C(){
  this.a = 37;
}
var o = new C();
console.log(o.a); // logs 37


function C2(){
  this.a = 37;
  return {a:38};
}

o = new C2();
console.log(o.a); // logs 38
```
5. <span style="color: #ea6f5a">箭头函数: </span>
> 在箭头函数中，this与封闭词法环境的this保持一致。在全局代码中，它将被设置为全局对象

## 深浅拷贝
### 浅拷贝
> 自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中地址，肯定会影响到另一个对象

1. object.assign
`object.assign(target, ...source)`
```javascript
    let target = {};
    let source = { a:1,c: { b: 2 } }
    Object.assign(target, source);

    console.log(target); // { a:1,c: { b: 2 } }
    source.a = 11
    // 理解： 如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象，其复制对象并不会因此改变。
    // a 的值 为 1，是基本类型，所以当 改为 11 时，复制对象并不会改变。

    source.c.b = 10;    // 都改变了
    // 理解：如果属性是引用类型，复制的就是内存中的地址，如果改变了内存地址，所以会影响到另一个对象。
    // 属性 c 是一个引用，所以当改变 c.b 的时候，两者都会被改变
    console.log(source); // { a:11, c: { b: 10 } }; 
    console.log(target); // { a: 1,c:{ b: 10 } };
```
- 它不会拷贝对象的继承属性
- 它不会拷贝对象的不可枚举的属性
- 可以拷贝 Symbol 类型的属性。

2. 扩展运算符
> 扩展运算符的语法：let cloneObj = {...obj}
```javascript
let obj = {a: 1, b: {c: 2}}
let obj2 = {...obj}
obj.a = 2
// 解释： 同上属性 a
console.log(obj)    // { a: 2, b: { c: 2 } }
console.log(obj2)   // { a: 1, b: { c: 2 } }
```
- 扩展运算符 和 object.assign 有同样的缺陷，也就是实现的浅拷贝的功能差不多，但是如果属性都是基本类型的值，使用扩展运算符进行浅拷贝会更加方便。

3. concat 拷贝数组
> 数组的 concat 方法其实也是浅拷贝，所以连接一个含有引用类型的数组时，需要注意修改原数组中 的元素属性，因为它会影响拷贝之后连接的数组。
```javascript
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr);  // [ 1, 2, 3 ]
console.log(newArr); // [ 1, 100, 3 ]
```

手工实现一个浅拷贝
```javascript

/**
 * 浅拷贝：
 * 1. 对 基本类型 做一个最基本的一个拷贝；
 * 2. 对 引用类型 开辟一个新的存储，并且拷贝一层对象属性。
 * @param {需要拷贝的对象} obj 
 */

const shallowClone = (target) => {
    if(typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? [] : {};
        for(let ele in target) {
            if(target.hasOwnProperty(ele)) {
                cloneTarget[ele] = target[ele]
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}

const cst = {age: 22, name: 'cst'}
let cloneCst = shallowClone(cst)
console.log(cloneCst);
```

### 深拷贝
> 浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝。深拷贝则不同，对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来。这两个对象相互独立，不受影响，彻底实现了内存上的分离。

总结：将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，且新对象的修改并不会改变原对象，二者实现真正的分离。

1. Json.parse(Json.stringify()) 
> 先将对象序列化（stringfy）为JSON字符串，然后再将其解析为对象。
注意点：
- 拷贝的对象的值中如果有函数，undefined，symbol这几种类型，经过 Json.stringify序列化之后的字符串中这个键值对会消失。
- 拷贝 Date 引用类型会变成字符串
- 无法拷贝不可枚举的属性
- 无法拷贝对象的原型链
- 拷贝 RegExp 引用类型会变成空对象 等等

2. 基础版 手写递归实现
```javascript
    /**
     * 深拷贝
     */

    function deepClone(obj) { 
        if (typeof obj !== "object") return obj;
        let cloneObj = Array.isArray(obj) ? [] : {}
        for(let key in obj) {                 //遍历
        if(typeof obj[key] ==='object') { 
            cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
        } else {
            cloneObj[key] = obj[key]  //基本类型的话直接复制值
        }
        }
        return cloneObj
    }
    const ccc = {a: 1, c: {b: 2}};
    let cloneCcc = deepClone(ccc)
    ccc.c.b = 10
    console.log(cloneCcc);  //{ a: 1, c: { b: 2 } }
```
注意点：这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝。

## jsInherit(Js 的继承)
> 继承是可以使得子类别分别具有父类的各种属性和方法。比如 “轿车” 和 “货车” 分别继承了汽车的属性。而不需要再次在 “轿车” 中定义汽车已有的属性。

<p style="color: #ea6f5a">JS 实现继承的几种方式:</p>

### 1. 原型链继承
> 原型链继承涉及到 构造函数、原型和实例，三者之间存在着一定的关系，即每一个构造函数都有一个原型对象，原型对象又包含一个指向构造函数的指针，而实例包含一个原型对象的指针。

- 构造函数都有一个原型对象: 每创建一个函数，该函数都会自带有一个 prototype 属性。该属性是一个指针，指向一个对象，该对象称之为原型对象
- 原型对象包含一个指向构造函数的指针：原型对象上默认有一个属性 constructor，该属性也是一个指针，指向其相关联的构造函数。
- 实例包含一个原型对象的指针：通过调用构造函数产生的实例对象，都拥有一个内部属性，指向了原型对象。它的实例对象能够访问原型对象上的所有属性和方法。

```javascript
// 1. 原型链继承
function Parent() {
    this.name = 'parent'
    this.play = [1,2,3]
}

Parent.prototype.say = function() {
    return this.name
}

function Child() {
    this.type = 'child'
}

// 验证：每一个构造函数都有一个原型对象 prototype，原型对象又包含一个指向 constructor 构造函数的指针
// console.log(Parent.prototype.constructor === Parent)    // true
// console.log(Child.prototype.constructor === Child)    // true

var child1 = new Parent()   // 这是 parent 的实例，只是通过 prototype 可以访问原型上的属性和方法
console.log(child1.play)  // [1,2,3]
child1.play.push(5)
var child2 = new Parent()
console.log(child1.play)   // [1,2,3, 5]  
console.log(child2.play) // [1,2,3] 并不能是 parent 实例变化， 但通过原型链继承则会

// 实现继承 Parent.prototype只是一个指针，指向的是原型对象，利用这个指针可以帮助我们实现js继承。
Child.prototype = new Parent()
// 实现继承  
var child3 = new Child()
console.log(child3.name + '-' + child3.play + '-' + child3.say()) // parent-1,2,3-parent

child3.play.push(4)
// 缺点：两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也会随之变化
var child4 = new Child()
console.log(child4.name + '-' + child4.play + '-' + child4.say()) // parent-1,2,3,4-parent
```

### 2.构造函数继承（借助call）
> 除了 Child5 的属性 type 之外，也能继承了 Parent1 的属性 name，缺点：父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法。
```javascript
function Parent1() {
    this.name = 'parent1'
}

Parent1.prototype.getName = function() {
    return this.name
}

function Child5() {
    Parent1.call(this)
    this.type = 'child5'
}

let child5 = new Child5();
console.log(child5) // Child5 { name: 'parent1', type: 'child5' }
// 所以除了 Child5 的属性 type 之外，也继承了 Parent1 的属性 name

console.log(child5.getName())       // TypeError
// 问题是，父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法。
```

### 3.组合继承（原型链、构造函数组合继承）
> 优点： 解决了上面两种方法的问题；缺点：调用了两次 Parent6，多进行了一次性能开销
```javascript

function Parent6() {
    this.name = 'parent6'
    this.play = [1,3,5]
}

Parent6.prototype.getName =  function() {
    return this.name
}

function Child6() {
    Parent6.call(this)
    this.type = 'child6'    //构造函数继承
}

Child6.prototype = new Parent6()    // 原型链继承（改变了 Child6 的原型对象）

Child6.prototype.constructor = Child6

var child7 = new Child6()
var child8 = new Child6()
child7.play.push(7)
console.log(child7.play, child8.play)       // [ 1, 3, 5, 7 ] [ 1, 3, 5 ] 互不影响了 
console.log(child7.getName(), child8.getName()) // parent6 parent6
```

### 4.原型式继承
> ES5 里面的 Object.create 方法，这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象（可选参数）。
```javascript
console.log('----------4.组合继承----------')
let parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      return this.name;
    }
  };
  let person4 = Object.create(parent4);
  person4.name = "tom";
  person4.friends.push("jerry");
  let person5 = Object.create(parent4);
  person5.friends.push("lucy");
  console.log(person4.name);        // tom
  console.log(person4.name === person4.getName());      // true
  console.log(person5.name);        // parent4
  console.log(person4.friends);     // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]
  console.log(person5.friends);     // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]
```

## Promise
> promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值。
```javascript


var p1 = Promise.resolve(1)
var p2 = Promise.resolve(2)
var p3 = Promise.resolve(3)


Promise.all([p1,p2,p3]).then(res => {
    console.log(res)    // [1,2,3]
})

//promise数组中任何一个promise为reject的话，
//则整个Promise.all调用会立即终止，并返回一个reject的新的promise对象。
var p1 = Promise.resolve(1),
    p2 = Promise.reject(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    //then方法不会被执行
    console.log(results); 
}).catch(function (e){
    //catch方法将会被执行，输出结果为：2
    console.log(2);
}).finally(() => {
    console.log('promise 执行完毕')
})
// promise.finally 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 promise 状态到底是  
// resolve 还是 reject 。这表明，finally 方法里面的操作，应该是与状态无关的，不依赖于 promise 的执行 结果
// 所以最终都会执行。

var http = require('http');

function getURL(URL) {
    return new Promise(function(resolve, reject){
	http.get(URL, function(res) {
	    resolve(res);
	}).on('error', function(e) {
	    reject(e);
	});
    });
}
var itbilu = getURL('http://itbilu.com');
var yijiebuyi = getURL('http://yijiebuyi.com');

Promise.all([itbilu, yijiebuyi]).then(function(results){
    results.forEach(function(result){
	setTimeout(() => {
        console.log(result.statusCode);
    }, 1000)
    });
}).catch(function(err){
    console.log(err);
});
```
```javascript
// 模拟网络请求队列

function multiRequest(urls, maxNum) {
    const ret = [];
    let i = 0;
    let resolve;
    const promise = new Promise(
        function(r) {
            return resolve = r
        }
    );
    const addTask = () => {
        if(i >= urls.length) {
            return resolve()
        }
        const task = request(urls[i++]).finally(() => {
            // console.log('两次')
            // addTask()
            addTask()
        })
        console.log('task is', task)
        ret.push(task)   
    } 
    while(i < maxNum) {
        // console.log('i is', i)
        addTask();
    }
 
    return promise.then(() => Promise.all(ret))
}
// 模拟请求
function request(url) {
    return new Promise(r => {
        const time = 1000;
        setTimeout(() => {
            console.log(url),
            r(url)
        }, time)
    })
}
multiRequest(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'], 2)
```

### [Promise 实现](https://tech.meituan.com/2014/06/05/promise-insight.html)

```javascript
function print() {
    return new myPromise((resolve, reject) => {
        resolve('success')
        // reject('failure')
    })
}

print()
    .then(res => {
        console.log('promise use: ', res)
        return `${res} 2`
    })
    .then(res => {
        console.log('promise use 2: ', res)
        return '使用第三次'
    })
    .then(res => {
        console.log('promise use 3: ', res)
    })


function myPromise(fn) {
    var deferreds = [],  // 等待中的事件 即 需要调用的函数 
        state = 'pending', // 队列状态
        lastValue = ''; // 为了缓存上一次的 返回值(resolve 函数中保存了) 理解还有问题

        // then 方法
    this.then =  onFulfilled =>  {
        if(state == 'pending') {
            deferreds.push(onFulfilled) 
            return this
        }
        onFulfilled(lastValue)
        return this
       
    }
    function resolve(value) {
        lastValue = value
        state = 'fulfilled'
        setTimeout( () => { // 延迟： promise 内部是同步执行的，resolve 会先于 then 执行。 所以 setTimeout
            deferreds.forEach(deferred => deferred(value))
        }, 0);
    }
    fn(resolve);
}
```