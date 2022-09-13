function _race(promiseList) {
    return new Promise((resolve, reject) => {
        for(let promise of promiseList) {
            promise.then(res => resolve(res)).catch(err => reject(err))
        }
    })
}

// 失败
const p1 = time => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('error')
    }, time)
})

// 成功
const p2 = time => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, time)
})

_race([p1(1000), p2(2000)]).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

_race([p1(3000), p2(2000)]).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})