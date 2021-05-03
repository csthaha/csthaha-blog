function Promise(excutor) {
    // 数据
    this.PromiseResult = null

    // 状态
    const self = this

    // pending 时 保存回调函数
    // this.callback = {}
    this.callbacks = []  // 保存多个

    this.PromiseState = 'pending'
    // resolve 方法
    const resolve = (data) => {
        // promise 对象状态只能修改一次
        if(this.PromiseState !== 'pending') return

        this.PromiseResult=  data
        this.PromiseState = 'resolve'

        // 整个 resolve 方法 是放在异步当中，当确定方法之后 改变状态之后再执行
        // if(this.callback['onResolved']) {
        //     this.callback.onResolved(data)
        // }

        // 多个 回调的时候
        this.callbacks.forEach(item => {
            item.onResolved(data)
        });
    }

    // reject 方法
    function reject(err) {
        // promise 对象状态只能修改一次
        if(self.PromiseState !== 'pending') return

        self.PromiseResult=  err
        self.PromiseState = 'reject'

        // 整个 resolve 方法 是放在异步当中，当确定方法之后 改变状态之后再执行
        // if(self.callback['onRejected']) {
        //     self.callback.onRejected(err)
        // }
        self.callbacks.forEach(item => {
            item.onRejected(data)
        })
    }
    try {
        //同步调用执行函数
        excutor(resolve, reject)    
    } catch (error) {
        reject(error)
    }
}

Promise.prototype.then = function(onResolved, onRejected) {
    // 由于 then 返回的 结果是一个 promise
    return new Promise((resolve, reject) => {

        // cb() 调用回调函数 resolve rejec 内部同步执行
        if(this.PromiseState === 'resolve') {
           try{
            let result = onResolved(this.PromiseResult)
            if(result instanceof Promise) {
                // then 方法 走成功之后 返回的结果是 promise 的话 
                // 如果 返回的结果是 promise 的话，那么 result 就是一个 promise
                
                result.then(r => {
                    resolve(r)
                }, e => {
                    reject(e)
                })

            } else {
                resolve(result)
            }
           }catch(err) {
               reject(err)
           }
        }

        if(this.PromiseState === 'reject') {
            onRejected(this.PromiseResult)
        }

        //如果resolve reject 在异步中, 由于异步，所以回调状态还未定处于 pending
        if(this.PromiseState === 'pending') {

            //保存回调， 但是这种只能保存一个回调，当 promise 实例指定多个回调时只能 调用一个
            this.callbacks.push(
                {
                    onResolved,
                    onRejected
                }
            ) 
        }
    })

}