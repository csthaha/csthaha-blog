/**
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function(nums) {
    const list = [];
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      list.push(nums[i] & nums[j]);
    }
  }
  for (let m = 0; m < list.length; m++) {
    for (let n = 0; n < nums.length; n++) {
      if ((list[m] & nums[n]) === 0) {
        res++;
      }
    }
  }
  return res;
};

// 回溯、三层for 循环都会超时。