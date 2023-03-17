// 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数 。


// 输入：nums = [1,1,1], k = 2
// 输出：2

// 输入：nums = [1,2,3], k = 3
// 输出：2

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    // 很明显 前缀和 问题
    // [i, j] 区间子数组 的和 为 sum[j] - sum[i] 所以 问题等于 sum[i] = sum[j] - k;
    // 即 map 中是否存在一个前缀和的值等于 sum[j] - k
    const map = new Map();
    let sum = 0;
    let count = 0;
    map.set(0, 1)
    for(let i = 0; i < nums.length; i++) {
        sum += nums[i];
        // if(sum === k) {
        //     count++;
        // }
        // 判断是否存在 前缀和为 sum - k  因为 sum - （sum - k ）为一个 和 为 k 的区间。
        if(map.has(sum - k)) {
            count += map.get(sum - k);
        }
        map.set(
            sum,
            (map.get(sum) || 0) + 1
        )
    }
    return count;
};

console.log(
    subarraySum([1,1,1],  2)
);
console.log(
    subarraySum([1,2,3],  3)
);


function composeAsync(...fnArgs) {
    let fns = fnArgs;
    return function (args) {
      return new Promise((resolve) => {
        let res = args;
        while (fns.length) {
          res = fns.shift().call(this, res)
        };
        resolve(res);
      })
    }
  }