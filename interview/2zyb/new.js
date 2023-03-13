function P(name, age) {
    this.name = name;
    this.age = age;
}

let p1 = new P('cst', 18)

console.log(p1, p1.name, '-', p1.age)

// 箭头函数不能当做构造函数来使用

// 箭头函数 没有单独的 this
// 不绑定 arguments
// 箭头函数不能用作构造器，和 new 一起使用会抛出错误
// 箭头函数没有 prototype 属性

const _new = function() {
    let obj = {}

    let [constructor, ...args] = [...arguments];
    console.log(constructor)
    obj.__proto__ = constructor.prototype;

    let res = constructor.apply(obj, args)

    return typeof res == 'object' ? res : obj

}

let p2 = _new(P, 'zyb', '19')

console.log(p2, p2.name, '-', p2.age)


Function.prototype.myNew = function(constructor, ...args) {
    // 创建一个新对象，并将新对象的原型指向构造函数的原型对象
    const obj = Object.create(constructor.prototype)
    // 执行构造函数。并将 this 指向新对象。
    const result = constructor.apply(obj, args);
    // 判断返回值是否是一个对象。是返回该对象。否则返回 obj；
    return result instanceof Object ? result : obj;
}