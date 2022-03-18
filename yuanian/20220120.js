// let nums = [1,2,3,4];
// nums = new Proxy(nums, {
//     get(target, prop) {
//         console.log(`you views ${target[prop]}`);
//         return target[prop] || 0;
//     },
//     set(target, prop, value) {
//         if (typeof value === 'number') {
//             target[prop] = value;
//             console.log(`you set ${target[prop]}`)
//             return true;
//         } else {
//             return false;
//         }
//     }
// })

// console.log(nums[4]);
// nums[4] = 5;
// console.log(nums[4]);
// nums[9] = '9';

let numbers = [0, 1, 2];
numbers = new Proxy(numbers, {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      Reflect.set(target, prop, value);
      return true;
    } else {
      return false;
    }
  },
});
numbers[4] = 4;
console.log(numbers[1]);
console.log(numbers[4]);