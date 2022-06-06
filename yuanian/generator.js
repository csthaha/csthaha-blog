/**
 *  `funtion*` 这种声明方式( function 后面跟一个 * ) 会定义一个生成器函数(generator function)
 *  它返回一个 Generator 对象
 */

function *generatorFn() {
    console.log(1);
    const y1 = yield new Promise(resolve => setTimeout(resolve, 1000, '接口数据'))
    console.log(y1); // y1  的值 为 此处 第二次调用 next 方法的时候的参数
    yield
    console.log(3);
}

const generatorObj = generatorFn()

// 第一个 next 方法 开始执行 generator 函数，遇到 yeild 停止 需要 调用 next 方法继续
const v1 = generatorObj.next()  

// 调用 next方法 有个返回值 {value: Promise, done: false}  done false 说明没有执行完
// value 则为 yield 后所接的内容
console.log(v1 , v1.value); 
v1.value.then(res => {
    generatorObj.next(res)

})

// 当 next方法传入了参数 则在 函数中 是上个 yield 的返回值
// generatorObj.next()
