Function.prototype.myBind =function (ctx,...arg){
    console.log(this, ctx)
    ctx.fn = this
    return function() {
        ctx.fn()
    }

}


function a() {
  console.log(this.b)
}
a.myBind({b: 2})()



