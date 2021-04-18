// async function _await() {
//     console.log(0)
//     let res = await 1
//     console.log(res)
//     console.log(2)
// }

// _await()

function* myGenerator() {
    console.log(yield Promise.resolve(1))   //1
    console.log(yield Promise.resolve(2))   //2
    console.log(yield Promise.resolve(3))   //3
}

let gen = myGenerator()

// console.log(gen)

function asyncAwait(gen) {
    let g = gen()       // next 方法会在 gen() 的原型之上 __proto__

    function _next(item) {
        var res = g.next(item)
        if(res.done) return res.val
        res.value.then(r => {
            _next(r)
        })
    }

    _next()  //第一次执行
}

asyncAwait(myGenerator)