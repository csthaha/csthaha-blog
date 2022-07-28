// export default function compose(context, next) {
//     // last called middleware #
//     let index = -1
//     // 从中间件第一项开始，执行中间件函数
//     return dispatch(0)
//     function dispatch (i) {
//         // 索引小于index，说明一个中间件函数中next被调用多次，不允许
//       if (i <= index) return Promise.reject(new Error('next() called multiple times'))
//         // index更新为i， 对应前面的检测
//       index = i
//         // 取出中间件的第i个函数 关键步骤1
//       let fn = middleware[i]
//         // 如果索引到数组最后，fn 赋值 next方法， 在koa 框架中该next参数为undefined
//       if (i === middleware.length) fn = next
//         // 遍历结束， fn为undefined，返回promise
//       if (!fn) return Promise.resolve()
//       try {
//         // 递归调用dispatch，不断调用下一个中间件，
//         return Promise.resolve(fn(context, function next () {
//           return dispatch(i + 1)
//         }))
//       } catch (err) {
//         return Promise.reject(err)
//       }
//     }
//   }
  

export default function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    // let index = -1
    return dispatch(0)
    function dispatch (i) {
      // if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      // index = i
      let fn = middleware[i]
      // console.log(i,'1xxx');
      // if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}