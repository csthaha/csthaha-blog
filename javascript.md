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