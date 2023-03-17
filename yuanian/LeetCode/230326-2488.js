/** 前缀和。 2488
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */ 
// var countSubarrays = function(nums, k) {
//     // 超出时间限制了
//     let count = 0;
//     var getSub = arr => {
//         arr.sort((a, b) => a - b)
//         let index = arr.length % 2 === 0 ? arr.length / 2 - 1 : arr.length >> 1;
//         return arr[index]
//     }
//     for(let i = 0; i < nums.length; i++) {
//         let cur = [nums[i]]
//         if(getSub(cur) === k) {
//             count ++;
//         }
//         for(let j = i + 1; j <  nums.length; j++ ) {
//             cur.push(nums[j]);
//             if(getSub(cur) === k) {
//                 count ++;
//             }
//         }
//     }
//     return count;

// };

// 使用前缀和思想 
// 1. 将 nums[i] > k 当作 1、将 < k 当作 -1
// 2. 问题就转成了 找到子数组 和为 0 的子数组个数。
// 3. 代码如下。
var countSubarrays = function(nums, k) {
    // 需要先找到 索引。因为结果肯定是包涵 目标值的。在 该值索引后
    let targetIndex = -1;
    let len = nums.length;
    for(let i = 0; i < len; i++) {
        if(nums[i] === k) {
            targetIndex  = i;
            break;
        }
    }

    let ans = 0;
    let sum = 0;
    let count = new Map();
    // 目标值。[k]
    count.set(0, 1)
    var transfV = val => {
        if(val === 0) return val;
        if(val > 0) return 1;
        return -1;
    }

    for(let i = 0; i < len; i++) {
        sum += transfV(nums[i] - k);
        if(i < targetIndex) {
            count.set(sum, (count.get(sum) || 0) + 1)
        } else {
            let cur = count.get(sum) || 0;   // sum 如果不是 0 的话就 count.get(sum) 为 undefined
            let pre = count.get(sum - 1) || 0;  // 为了是获取 [1, 2] 1  这种情况。 此时 sum 为 1.
            ans += cur + pre;
        }
    }
    return ans
};

console.log(
    countSubarrays([2,3,1], 3)  // 1
);
console.log(
    countSubarrays([3,2,1,4,5], 4) // 3
);


Function.prototype._log = function() {
    let args = [].map.call(arguments, item => `(app)${item}`)
    console.log.apply(console, args)
}

