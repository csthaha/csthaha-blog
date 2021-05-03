function curry() {
    let args = [...arguments]

    let addFun = function() {
        args.push(...arguments)
        return addFun
    }

    addFun.toString = () => args.reduce((pre, next) => pre + next)

    return addFun
}

console.log(curry(1,2))
console.log(curry(1,2)(3,4))
console.log(curry(1,2)(3)(4))
console.log(curry(1,2)(3,4)(5))