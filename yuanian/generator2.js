function *generator2() {
    // 从调用生成器对象调用 next 方法开始执行
    console.log('----------生成器函数通过调用 next 方法开始----------');
    const v1 = yield new Promise(resolve => setTimeout(resolve, 1000, '第一个接口数据'))
    // 这时候需要调用两次 next 方法才能获取到 v1 且 v1 的值 为 第二个 next 方法的参数
    console.log('----------v1: 值为第二个 next 方法的入参----------', v1);
    const v2 = yield new Promise(resolve => setTimeout(resolve, 1000, `${v1},第二个接口数据`))
    console.log('----------v2: 值为前面两个的值的拼接----------',v2);
}

const generatorObj = generator2()

// const p1 = generatorObj.next()
// p1.value.then(res => {
//     generatorObj.next(res)
// })

// 等价于
// generatorObj.next().value.then(res => {
//     generatorObj.next(res)
// })

// generatorObj.next().value.then(res => {
//     generatorObj.next(res).value.then(res2 => {
//         generatorObj.next(res2)
//     })
// })
// 缺点 需要手动调用 next 不好

/**
 * 执行完生成器函数
 * @param {Funtion} fn 生成器函数
 */
function co(fn) {
    const generatorObj = fn();
    // 递归调用 next 执行函数
    const handle = result => {
        // 如果 done 值 为 ture 说明 改函数执行完
        if(result.done) return
        result.value.then(res => {
            handle(generatorObj.next(res))
        })
    }
    handle(generatorObj.next())
}

co(generator2)