/**
 * 模拟延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
 function sleep(delay) {
    return new Promise((_, reject) => {
      setTimeout(() => reject('超时喽'), delay)
    })
  }
  
  /**
   * 模拟请求
   */
  function request() {
    // 假设请求需要 1s
    return new Promise(resolve => {
      setTimeout(() => resolve('成功喽'), 1000)
    })
  }
  
  /**
   * 判断是否超时
   * @param {() => Promise<any>} requestFn 请求函数
   * @param {number} delay 延迟时长
   * @returns {Promise<any>}
   */
  function timeoutPromise(requestFn, delay) {
    return new Promise((resolve, reject) => {
      const promises = [requestFn(), sleep(delay)]
      for (const promise of promises) {
        // 超时则执行失败，不超时则执行成功
        // promise.then(res => resolve(res), err => reject(err))

        // 多个异步任务同时执行，不管是哪个异步任务先执行完。
        // 先执行完的那个 promise 先修改 外层 promise 的状态。
        // 而Promise的状态是不可逆的。 外层 promise 状态一经被修改则不能再次被修改。
        // 所以 外层状态即可获取到先执行的异步任务结果。
        promise.then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
      }
    })
  }

  timeoutPromise(request, 300).then(res => {
      console.log(res);
  }).catch(err => {
      console.log(err, '超市');
  })

  Promise.race([request(), sleep(3000)]).then(res => {
      console.log('请求成功: ', res);
  }).catch(err => {
      console.log(err);
  })