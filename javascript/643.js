/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
    let i = 1, sum = 0, res = 0;
    for(let m = 0; m < k; m++) {
        sum += nums[m]
    }
    // while (i <= nums.length - k) {
        
    //     for (let j = i; j <= i + k - 1 ; j++) {
    //         sum += nums[j]
    //     }

    //     if(sum > res) {
            
    //         res = sum
    //     }
    //     i++
    //     sum = 0
    // }

    // 滑动窗口
    res = sum
    console.log(sum, res)
    for(let j = k; j < nums.length; j++) {
        sum = sum - nums[j - k] + nums[j];
        res = Math.max(res, sum)
    }
    return res / k
};

console.log(findMaxAverage([1,12,-5,-6,50,3], 4))
// console.log(findMaxAverage([-1], 1))