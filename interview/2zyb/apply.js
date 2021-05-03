Function.prototype._apply = function(ctx) {
    var ctx = ctx || globalThis
    ctx.fn = this
    let args = arguments[1] ? arguments[1] :  ''
    let res = ctx.fn(...args)
    delete ctx.fn
    return res
}

// Function.prototype._apply = function (context) {
//     var context = context || window;
//     context.fn = this;
//     var result;
//     if (arguments[1]) {
//         result = context.fn(...arguments[1]);
//     } else {
//         result = context.fn()
//     }
//     delete context.fn;
//     return result;
// }

var obj = {
    name : 'linxin'
}

function func(firstName, lastName){
    console.log(firstName + ' ' + this.name + ' ' + lastName);
}

func._apply(obj, ['A', 'B']);    // A linxin B

func._apply();    // A linxin B