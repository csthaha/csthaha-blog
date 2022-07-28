import _koa from './_koa.js'
const app = new _koa();
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
})

app.use(async (ctx, next) => {
    console.log(3);
    await next();
    console.log(4);
})
app.use(async (ctx, next) => {
    console.log(5);
})
app.listen(8888);
// console.log('server start at 8888');