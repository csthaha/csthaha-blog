// //app.js


// const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
// const app = new Koa()
// app.use(bodyParser())
// app.use( async(ctx) => {
//     console.log('请求体内容', ctx.request.body, '请求方法:', ctx.request.method)
//     if(ctx.request.body && ctx.request.method === 'GET'){

//       ctx.body = `方法：GET, 请求体内容: ${JSON.stringify(ctx.request.body)} ----来自node`
//     }
// })
// app.on('error', function(err, ctx) {
//   console.log('server error', err)
// }) //监听错误信息

// app.listen(3000, () => {
//   console.log('server is running at http://localhost:3000') //监控3000端口
// })
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa()
app.use(bodyParser())
app.use( async(ctx) => {
    console.log('请求体内容', ctx.request.body, '请求方法:', ctx.request.method)
    ctx.body = 'hello world'
})
app.on('error', function(err, ctx) {
  console.log('server error', err)
}) //监听错误信息

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000') //监控3000端口
})