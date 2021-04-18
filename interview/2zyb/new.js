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
