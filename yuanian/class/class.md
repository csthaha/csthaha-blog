### class

> javascript ，生成实例对象的传统方法是通过构造函数。

```javascript
function Ponit(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.getPoint = function() {
    console.log(this) // 指向实例对象 （谁调用指向谁）
    return `(${this.x},${this.y})`
}

```
> 构造函数写法 相对于传统面向对象来说差异较大。所以 es6 引入 class。
```javascript
class Point {
    // constructor 在 创建对象的时候初始化 // 不写的时候会默认帮你补上空的 constructor(){}
    // 1. 创建实例的时候初始化对象；2. 也可以返回另一个对象
    // 方法默认返回实例对象（即this）
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getPoint() {
        return `(${this.x},${this.y})`
    }
}
```

```javascript
es6 的类 完全可以看作是 构造函数的另一种写法

1. 类的数据类型其实就是 `function`: `typeof Point === 'function'`
2. 类本身就指向构造函数: `Point === Point.prototype.constructor`
3. 类中的方法其实是定义在构造函数的 prototype 上的： 即上面两种写法

*类的所有方法都是定义在类的构造函数中的*

因此，在类的实例上面调用方法，其实就是调用原型上的方法。`p1.constructor === Point.prototype.constructor`

4. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）

```