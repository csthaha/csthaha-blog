// setTimeout
// let time = 1000
// const callback= () => {
//     console.log(`${time / 1000 } s 之后执行 callback `)
// }
// setTimeout(callback, time);

// setInterval
// setInterval(() => {
//     console.log(`${time / 1000 } s 之后 setInterval 重复执行 callback `)
// }, time);

// setTimeout 实现 setInterval
// setInterval 就是重复调用 setTimeout 递归调用

// const mySetInterval = (cb, time) => {
//     const fn = () => {
//         cb();   // 执行 callback 回调函数
//         setTimeout(() => {
//             fn()       // 递归调用自己
//         }, time)
//     }

//     setTimeout(fn, time)
// }
// let t = 1000
// const id = mySetInterval(() => {
//     console.log(`${t / 1000} 之后回调` )
// }, t)
// clearInterval(id)

function mySetInterval(callback, time) {
    let id;
    const task = (cb, t) => {
        id = setTimeout(() => {
            cb();
            console.log('id is', id)
            task(cb,t)
        },t)
    }

    task(callback, time)
    // return () => {
    //     console.log(id)
    //     
    
    // }
}
let t = 1000
mySetInterval(() => {
    console.log(`${t / 1000} 之后回调` )
}, t)
