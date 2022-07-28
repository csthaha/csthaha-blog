// // application.js 
// const Emitter = require('events')
import Emitter from 'events'
import http from 'http'

import compose from './compose.js'
// import compose from 'koa-compose'
import context from './context.js'
import request from './request.js'
import response from './response.js'

import onFinished from 'on-finished'

class Application extends Emitter { 
    constructor(options) { 
        super(); 
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middleware = []; // 中间件队列 
    } 
    // ⼊⼝⽅法 
    listen(...args) { 
        //最底部还是使用了原生的createServer
        const server = http.createServer(this.callback()); //具体看看callback返回的是什么方法zfa
        return server.listen(...args); 
    } 
    // 添加中间件⽅法 
    use(fn) { 
        this.middleware.push(fn); 
        return this; 
    } 
    callback(){ 
        const fn = compose(this.middleware); 
        this.handleRequest(fn); 
        // 换个名字 handleRequest => handleRequestFn 
        // const handleRequestFn = (req, res) => {  
        //     const ctx = this.createContext(req, res); //对req和res进行了封装，生成了ctx，传到了下面的handleRequest
        //     return this.handleRequest(ctx, fn); 
        // }; 
        // return handleRequestFn; 
    } 
    respond (ctx) {
        // allow bypassing koa
        if (ctx.respond === false) return
      
        if (!ctx.writable) return
      
        const res = ctx.res
        let body = ctx.body
        const code = ctx.status
      
        // // ignore body
        if (statuses.empty[code]) {
          // strip headers
          ctx.body = null
          return res.end()
        }
      
        if (ctx.method === 'HEAD') {
          if (!res.headersSent && !ctx.response.has('Content-Length')) {
            const { length } = ctx.response
            if (Number.isInteger(length)) ctx.length = length
          }
          return res.end()
        }
      
        // status body
        if (body == null) {
          if (ctx.response._explicitNullBody) {
            ctx.response.remove('Content-Type')
            ctx.response.remove('Transfer-Encoding')
            ctx.length = 0
            return res.end()
          }
          if (ctx.req.httpVersionMajor >= 2) {
            body = String(code)
          } else {
            body = ctx.message || String(code)
          }
          if (!res.headersSent) {
              console.log(212);
            ctx.type = 'text'
            ctx.length = Buffer.byteLength(body)
          }
          return res.end(body)
        }
      
        // responses
        if (Buffer.isBuffer(body)) return res.end(body)
        if (typeof body === 'string') return res.end(body)
        if (body instanceof Stream) return body.pipe(res)
      
        // // body: json
        body = JSON.stringify(body)
        console.log(body,12);
        if (!res.headersSent) {
          ctx.length = Buffer.byteLength(body)
        }
        res.end(body)
      }
    //   onerror (err) {
    //     // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
    //     // See https://github.com/koajs/koa/issues/1466
    //     // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
    //     const isNativeError =
    //       Object.prototype.toString.call(err) === '[object Error]' ||
    //       err instanceof Error
    //     if (!isNativeError) throw new TypeError(util.format('non-error thrown: %j', err))
    
    //     if (err.status === 404 || err.expose) return
    //     if (this.silent) return
    
    //     const msg = err.stack || err.toString()
    //     console.error(`\n${msg.replace(/^/gm, '  ')}\n`)
    //   }
    handleRequest(fnMiddleware) { 
        // res.statusCode = 404
        // 错误处理 
        // const onerror = err => ctx.onerror(err)
        // const handleResponse = () => this.respond(ctx)
        // return fnMiddleware(ctx).then(handleResponse).catch(onerror); 
        return fnMiddleware().then().catch(); 
    } 
    // 重新封装实例对象，⽅便了多个地⽅同时使⽤ 
    // createContext(req, res) { 
    //     context.onerror = this.onerror;
    //     const response = context.response = Object.create(this.response)
    //     request.ctx = response.ctx = context
    //     request.response = response
    //     return context; 
    // } 
}

export default Application;
