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


