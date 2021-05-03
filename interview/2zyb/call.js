

Function.prototype._call = function(ctx) {
    ctx.fn = this

    let args = [...arguments].slice(1)

    var res = ctx.fn(...args)

    delete ctx.fn

    return res
}

var obj = {
    name: 'cst',
}

function logNmae(arg) {
    return this.name + arg
}

let res = logNmae._call(obj, 'I')

console.log('res is', res)