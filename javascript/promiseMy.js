// function print() {
//     return new myPromise((resolve, reject) => {
//         resolve('success')
//         // reject('failure')
//     })
// }

// print()
//     .then(res => {
//         console.log('promise use: ', res)
//         return `${res} 2`
//     })
//     .then(res => {
//         console.log('promise use 2: ', res)
//         return '使用第三次'
//     })
//     .then(res => {
//         console.log('promise use 3: ', res)
//     })


// function myPromise(fn) {
//     var deferreds = [],  // 等待中的事件 即 需要调用的函数 
//         state = 'pending', // 队列状态
//         lastValue = ''; // 为了缓存上一次的 返回值(resolve 函数中保存了) 理解还有问题

//         // then 方法
//     this.then =  onFulfilled =>  {
//         if(state == 'pending') {
//             deferreds.push(onFulfilled) 
//             return this
//         }
//         onFulfilled(lastValue)
//         return this
       
//     }
//     function resolve(value) {
//         lastValue = value
//         state = 'fulfilled'
//         setTimeout( () => { // 延迟： promise 内部是同步执行的，resolve 会先于 then 执行。 所以 setTimeout
//             deferreds.forEach(deferred => deferred(value))
//         }, 0);
//     }
//     fn(resolve);
// }

// 串行 Promise：衔接当前 promise 和 后邻的 promise

function print() {
    return new myPromise((resolve, reject) => {
        resolve('success')
        // reject('failure')
    })
}

print()
    .then(res => {
        console.log('promise use: ', res)
        return `${res} 2`
    })
    .then(res => {
        console.log('promise use 2: ', res)
        return '使用第三次'
    })
    .then(res => {
        console.log('promise use 3: ', res)
    })


function myPromise(fn) {
    var deferreds = [],  // 等待中的事件 即 需要调用的函数 
        state = 'pending', // 队列状态
        lastValue = ''; // 为了缓存上一次的 返回值(resolve 函数中保存了) 理解还有问题

        // then 方法
    this.then =  onFulfilled =>  {
        return new myPromise(resolve => {
            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            })
        })
       
    }
    function handle(deferred) {
        if (state === 'pending') {
            deferreds.push(deferred);
            return;
        }
        var ret = deferred.onFulfilled(lastValue);
        deferred.resolve(ret);
    }

    function resolve(value) {
        if (value && (typeof value === 'object' || typeof value === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                then.call(value, resolve);
                return;
            }
        }
        lastValue = value
        state = 'fulfilled'
        setTimeout( () => { // 延迟： promise 内部是同步执行的，resolve 会先于 then 执行。 所以 setTimeout
            deferreds.forEach(deferred => handle(deferred))
        }, 0);
    }
    fn(resolve);
}