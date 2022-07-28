const Koa = require('koa'); //引入koa模块
const app = new Koa(); //创建一个koa的实例

// //中间件的形式 
app.use((ctx, next)=>{
    ctx.response.type = 'html';
    ctx.response.body = '<p>http response success! welcome koa2</p>'; // response对body赋值
});
app.listen(8089);
console.log('server start at 8089');


// // 仔细观察koa2和上面原生的差别在于一个使用response的方式变成了ctx.response ,ctx是一个在中间件中流转的实例，实例上会有request和response两个属性，所以我们可以直接在ctx上使用response

// app.use(async (ctx, next) => {
//     console.log(1);
//     ctx.response.type = 'html';
//     ctx.response.body = '<p>http response success! welcome koa2</p>'; // response对body赋值
//     await next();
//     console.log(2);
// })

// app.use(async (ctx, next) => {
//     console.log(3);
//     await next();
//     console.log(4);
// })
// app.use(async (ctx, next) => {
//     console.log(5);
// })
// app.listen(8888);
// console.log('server start at 8888');