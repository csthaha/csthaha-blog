var findPath = function(obj, str) {
    if(Object.prototype.toString.call(obj) !== '[object Object]') return obj;
    let path = str.slice(0, 1);
    let remainStr = str.slice(2);
    let item =  obj[path];
    return item ? findPath(item, remainStr) : undefined;
}
var obj = {
    a: {
        b: {
            c: 1
        }
    },
    d: 2,
    m: {
        k: function() {}
    }
}
console.log(
    findPath(obj, 'a.b.c')
);
console.log(
    findPath(obj, 'a.d.c')
);
console.log(
    findPath(obj, 'd')
);
console.log(
    findPath(obj, 'm.k')
);