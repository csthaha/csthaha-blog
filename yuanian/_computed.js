// 计算属性 书写的时候是方法，为什么直接访问方法名就能获取到值？？

// 通常我们都需要调用方法名。
const name = 'fh';
function getName() {
    return `my name is ${name}`
}
// console.log(getName());  // my name is fh

// 那么我们如何做到 直接 访问 getName 就能 获取到呢？
const _computed = {
    getInfo: function() {
        return `${name} is a gay`
    },
    getSex: () => {
        return `${name} is girl`
    }
}
const forEachFn = (target, cb) => {
    Object.keys(target).forEach((key) => {
        cb(target[key], key)
    })
}
forEachFn(_computed, (fn, key) => {
    Object.defineProperty(_computed, key, {
        get: () => fn()
    })
})
console.log(getName());  // my name is fh
console.log(_computed.getInfo); // fh is a gay
console.log(_computed.getSex); // fh is girl