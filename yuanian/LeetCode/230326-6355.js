/**
 * @param {number[]} nums
 * @return {boolean}
 */
var primeSubOperation = function(nums) {
    if(nums.length === 0) return false;
    // 贪心
    let list = [nums[nums.length - 1]];
    var isPri = num => {
        let isP = true;
        for(let i = 2; i < num; i++) {
            if(num % i === 0) {
                isP = false;
            }
        }
        return isP;
    }
    var maxPri = (min, num) => {
        let max = 1;
        for(let i = 2; i < num; i++) {
            if(isPri(i)) {
                max = i;
                if(max > min) {
                    break;
                }
            }
        }
        return max;
    }
    for(let i = 0; i < nums.length - 1; i++) {
        // 减去该数的最大指数
        nums[i] -= maxPri(nums[i])
    }
    console.log(nums);
};
primeSubOperation([4,9,6,10])