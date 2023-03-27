/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    // 超出时间限制
    // nums.sort((a, b) => a - b);
    // let len = nums.length;
    // let ans = 0;
    // while(nums[0] !== nums[len - 1]) {
    //     let diff = 1;
    //     for(let i = 0; i < len - 1; i++) {
    //         nums[i] += diff;
    //     }
    //     ans += 1;
    //     nums.sort((a, b) => a - b);
    //     if(nums[len - 1] === nums[0]) return ans;
    // }

    // return 0;

    let ans = 0;
    let min = Math.min(...nums);
    for(let num of nums) {
        ans += num - min
    }
    return ans
};

console.log(
    minMoves([1,2,3])
);