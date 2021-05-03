Object._create = function(proto, propertyObj = undefined) {
    if(propertyObj === null) {
        throw 'error'
    } else {
        let obj = {}
        obj.__proto__ = proto

        if(propertyObj !== undefined) {
            Object.defineProperties(obj, propertyObj)
        }

        if(proto === null) {
            obj.__proto__ = null
        }

        return obj
    }


}

let obj = {name: 'cst', age: 19}

let c = Object._create(obj)

console.log(c)