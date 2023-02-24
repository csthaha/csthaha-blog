/** 使数组中所有元素都等于零
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function(nums) {
    return [...new Set(nums.filter(item => !!item))].length
};