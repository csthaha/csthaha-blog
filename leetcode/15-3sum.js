/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function (nums) {
    if (nums.length < 3) return [];
    let res = [];
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1,
            right = nums.length - 1;
        if (i === 0 || nums[i] !== nums[i - 1]) {
            while (left < right) {
                if (nums[i] + nums[left] + nums[right] === 0) {
                    res.push([nums[i], nums[left], nums[right]])
                    left++;
                    right--;
                    while (nums[left] === nums[left - 1]) {
                        left++;
                    }
                    while (nums[right] === nums[right + 1]) {
                        right--;
                    }
                } else if (nums[i] + nums[left] + nums[right] < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return res;
};
// -4 -1 -1 0 1 2
console.log(threeSum([-1,0,1,2,-1,-4]))