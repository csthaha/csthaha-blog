function func() {

}

// let func1 = new func()
let func1 = function() {

}

func.prototype.func1 = func1
console.log(func1 instanceof func)
console.log(func instanceof func)

function _instanceof(l, r) {
    while(true) {
        if(l === null) return false
        if(l.__proto__ === r.prototype) return true
        l = l.__proto__
    }

}



console.log(_instanceof(func1, func))
console.log(_instanceof(func, func))
console.log(_instanceof(null, func))