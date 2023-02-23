// function curry() {
//     let args = [...arguments]

//     let addFun = function() {
//         args.push(...arguments)
//         return addFun
//     }

//     addFun.toString = () => args.reduce((pre, next) => pre + next)
//     console.log(addFun);
//     return addFun
// }

// Function.prototype.toString()
// 返回一个表示当前函数源代码的字符串
// ```javasctipt
// function sum(a, b) {
//     return a + b;
//   }
  
//   console.log(sum.toString());
//   // expected output: "function sum(a, b) {
//   //                     return a + b;
//   //                   }"
  
//   console.log(Math.abs.toString());
//   // expected output: "function abs() { [native code] }"
// ```

function curry(fn) {
    return function curried(...args) {
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      } else {
        return function(...moreArgs) {
          return curried.apply(this, args.concat(moreArgs));
        }
      }
    };
}  



console.log(curry(1,2))
console.log(curry(1,2)(3,4))

console.log(curry(1,2)(3)(4))
console.log(curry(1, 2)(3, 4)(5))

