/**  1590
 * 给你一个正整数数组 nums，请你移除 最短 子数组（可以为 空），
 * 使得剩余元素的 和 能被 p 整除。 不允许 将整个数组都移除。
 * 请你返回你需要移除的最短子数组的长度，如果无法满足题目要求，返回 -1 。
 * 子数组 定义为原数组中连续的一组元素。

 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minSubarray = function(nums, p) {
    let sum = nums.reduce((a, b) => a + b, 0);
    let mod = sum % p;
    if(sum < p) return -1;
    if(mod === 0) return 0;
    // 是不是就是求 k * p + mod 的最小子数组呢。 ？？

    if(nums.includes(mod)) return 1;

    const list = [];
    let k = 0;

    while( k * p + mod <= sum) {
        list.push(
            k * p + mod
        )
        k++;
    }
    // console.log(list);

    // 问题转化为  nums 中子数组的和 等于 list 中 项的 个数。

    let min = nums.length;
    for(let m = 0; m < list.length; m++) {
        let total = list[m];
        let l = 0
        while(l < nums.length) {
            let s = 0;
            for(let n = l; n < nums.length; n++) {
                s += nums[n];
                if(s === total) {
                    min = Math.min(min, n  - l + 1);
                    l += 1
                    break;
                }
                if(s > total) {
                    l += 1;
                    break;
                }

                if (n === nums.length  -1) {
                    l += 1;
                }
            }
        }
    }
    return min === nums.length ? -1 : min;
};

var minSubarray2 = function(nums, p) {
    const n = nums.length;
    let sum = 0;
    for (let i = 0; i < n; ++i) {
        sum += nums[i];
        sum %= p;
    }
    if (sum === 0) {
        return 0;
    }
    const map = new Map();
    map.set(0, -1);
    let prefix = 0, ans = n;
    for (let i = 0; i < n; ++i) {
        prefix = (prefix + nums[i]) % p;
        const target = (prefix - sum + p) % p;
        if (map.has(target)) {
            ans = Math.min(ans, i - map.get(target));
        }
        map.set(prefix, i);
    }
    return ans === n ? -1 : ans;
};




// 上面解法 在 leet code 中超时了。

console.log(
    minSubarray2([3,1,4,2], 6)
);

// console.log(
//     minSubarray2([6,3,5,2,7], 9)
// );
// console.log(
//     minSubarray2([1,2,3], 3)
// );
// console.log(
//     minSubarray2([1,2,3], 7)
// );

// console.log(
//     minSubarray2([4,4,2], 7)
// );