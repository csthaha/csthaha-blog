/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    if(nums.length < 3) return;
    let l = 1;
    let r = nums.length - 2;
    let ans = -1;
    while(l < r) {
        if(nums[l] > nums[l - 1] && nums[l] > nums[l + 1]) {
            console.log(nums[l], nums[l -1], nums[l + 1]);
            ans = l;
            break;
        }

        if(nums[r] > nums[r - 1] && nums[r] > nums[r + 1]) {
            ans = r;
        }
        l++;
        r--;
    }

    // 此时 l = r
    if(nums[l] > nums[l + 1] && nums[l] > nums[l - 1]) {
        ans = l
    }

    return ans
};

console.log(findPeakElement([1,2,3,1]));