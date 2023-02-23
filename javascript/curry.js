// 柯里化
function curry(a) {
        return (b = 0) => {
            return (c = 0)=> {
                return a + b + c
            }
        }
}

console.log(curry(1)(2)(3))

// 普通方法
function add(a, b) {
    return a + b
}
console.log(add(1,2))

// 如果想实现 sum(1)(2)(3)(4)(5)...(n)就得嵌套n-1个函数，

function myCurry(num) {
    var count = 0,
        arr = [];

    return function reply(arg = 0) {
        arr.push(arg);
        if(++count >= num) {
            return arr.reduce((a,b) => {
                return a + b
            }, 0)
        } else {
            return reply
        }
    }
}

var sum = myCurry(4)
console.log(sum(1)(2)(3)(4))

// function myCurry1(fn) {
//     var args = [].
// }

function _curry(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.apply(this, args);
      } else {
        return function(...args2) {
          return curried.apply(this, args.concat(args2));
        }
      }
    };
}
  

console.log(Object.prototype.toString.call('1'))
console.log(Array.prototype.slice.call('1'))
console.log(Array.prototype.slice('1'))
console.log([].slice('1'))
console.log([].slice.call('1'))
console.log([].__proto__.slice.call('1'))