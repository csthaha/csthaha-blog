let target = {};
let source = { a: { b: 2 } }
Object.assign(target, source);

console.log(target); // { a: { b: 2 } }; 

source.a.b = 10; 
console.log(source); // { a: { b: 10 } }; 
console.log(target); // { a: { b: 10 } };


let obj = {a: 1, b: {c: 2}}
let obj2 = {...obj}
obj.a = 2;
console.log(obj, obj2)


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