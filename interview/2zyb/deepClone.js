function deepClone(obj) {
    if(typeof obj !== 'object') return obj;

    let res = Array.isArray(obj) ? [] : {}

    if(obj instanceof Date) {
        res = new Date(obj)
    } else if(obj instanceof RegExp) {
        res = obj
    }else if(Object.prototype.toString.call(obj) == "[object Null]") {
        res = null
    } else {
        for(let key in obj) {
            if(typeof obj[key] === 'object') {
                res[key] = deepClone(obj[key])
            } else  {
                res[key] = obj[key]
            }
        }
    }

    return res
}

var obj = {
    a: 1, b: 2, c: {
    d: 1,
    e: new Date('2010'),
    h: /^[0-9]*$/
}, 
f: new Date('2021'), 
g: /^[0-9]*$/,
i: undefined,
j: null
}

var cloneObj = deepClone(obj)
var cloneObj2 = JSON.parse(JSON.stringify(obj))

console.log(cloneObj, cloneObj2)