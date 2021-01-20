// let target = {};
// let source = { a:1,c: { b: 2 } }
// Object.assign(target, source);

// console.log(target); // { a:1,c: { b: 2 } }
// source.a = 11
// source.c.b = 10;    // 都改变了
// console.log(source); // { a:11, c: { b: 10 } }; 
// console.log(target); // { a: 1,c:{ b: 10 } };


// let obj = {a: 1, b: {c: 2}}
// let obj2 = {...obj}
// obj.a = 2;
// console.log(obj, obj2)


// /**
//  * 浅拷贝：
//  * 1. 对 基本类型 做一个最基本的一个拷贝；
//  * 2. 对 引用类型 开辟一个新的存储，并且拷贝一层对象属性。
//  * @param {需要拷贝的对象} obj 
//  */

// const shallowClone = (target) => {
//     if(typeof target === 'object' && target !== null) {
//         const cloneTarget = Array.isArray(target) ? [] : {};
//         for(let ele in target) {
//             if(target.hasOwnProperty(ele)) {
//                 cloneTarget[ele] = target[ele]
//             }
//         }
//         return cloneTarget;
//     } else {
//         return target;
//     }
// }

// const cst = {age: 22, name: 'cst'}
// let cloneCst = shallowClone(cst)
// console.log(cloneCst);

// /**
//  * 深拷贝
//  */

// function deepClone(obj) { 
//     if (typeof obj !== "object") return obj;
//     let cloneObj = Array.isArray(obj) ? [] : {}
//     for(let key in obj) {                 //遍历
//       if(typeof obj[key] ==='object') { 
//         cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
//       } else {
//         cloneObj[key] = obj[key]  //基本类型的话直接复制值
//       }
//     }
//     return cloneObj
// }
// const ccc = {a: 1, c: {b: 2}};
// let cloneCcc = deepClone(ccc)
// ccc.c.b = 10
// console.log(cloneCcc);  //{ a: 1, c: { b: 2 } }

// /**
//  * 完整版 深拷贝
//  */

// 是否是引用数据类型
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = function (obj, hash = new WeakMap()) {
//   WeakMap 对象是一组 键/值对 的集合，其中键是弱引用的。其键必须是对象，而值可以是任意的
// weakmap 的 key 只能是 object 类型，原始数据类型是不能作为 key 的（比如 symbol）

  if (obj.constructor === Date) 
  return new Date(obj)       // 日期对象直接返回一个新的日期对象

  if (obj.constructor === RegExp)
  return new RegExp(obj)     //正则对象直接返回一个新的正则对象

  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) return hash.get(obj)

  let allDesc = Object.getOwnPropertyDescriptors(obj)
  // getOwnPropertyDescriptors 方法用来获取一个对象的所有自身属性的描述符。如果没有任何属性，则返回空对象
  // getPrototypeOf 方法返回指定对象的原型（内部[[Prototype]] 的值）。 Object.getPrototypeOf(object) 要返回其原型的对象。
 
  // object.create(proto, [propertiesObject]) 
    // proto 新创建对象的原型对象
    // propertiesObject 可选 

  //遍历传入参数所有键的特性， 先浅拷贝一个对象（包括原型链上的属性）
//   Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  //继承原型链

  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) { 

    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]

  }

  return cloneObj

}

// 下面是验证代码

let obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: '我是一个对象', id: 1 },
  arr: [0, 1, 2],
  func: function () { console.log('我是一个函数') },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol('1')]: 1,
};

Object.defineProperty(obj, 'innumerable', {
  enumerable: false, value: '不可枚举属性' }
);

obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj    // 设置loop成循环引用的属性
let cloneObj = deepClone(obj)
cloneObj.arr.push(4)
console.log('obj', obj)
console.log('cloneObj', cloneObj)
