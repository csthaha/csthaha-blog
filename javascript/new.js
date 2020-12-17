// function car(model, year) {
//     this.model = model;
//     this.year = year;
// }

// const byd = new car('byd', 2020)
// console.log(byd.model,'-', byd.year);

// const lsls = {}
// car.call(lsls, 'lsls', 2022)
// console.log(lsls.model, '-', lsls.year);

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