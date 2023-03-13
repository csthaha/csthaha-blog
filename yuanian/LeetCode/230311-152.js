/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    // 暴力求解试试
    let max = nums[0];
    for(let i = 0; i < nums.length; i++) {
        let pro = nums[i];
        max = Math.max(max, pro);
        for(let j = i + 1; j < nums.length; j++) {
            pro = pro * nums[j];
            max = Math.max(max, pro)
        }
    }
    return max;
};

console.log(
    maxProduct([0, 2])
);