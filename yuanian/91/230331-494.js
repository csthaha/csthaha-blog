/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    // const ans = [];
    // let count = 0

    // var backTrack = (path, index, sum) => {
    //     if(index === nums.length) {
    //         if(sum === target) {
    //             ans.push([...path])
    //             count++
    //         }
    //         return;
    //     }
    //     path.push(nums[index])
    //     backTrack(path, index + 1, sum + nums[index]);
    //     path.pop();
    //     path.push(-nums[index])
    //     backTrack(path, index + 1, sum - nums[index]);
    //     path.pop()
    // }
    // backTrack([], 0, 0)
    // // return ans
    // console.log(ans);
    // return count;

    // let count = 0
    // var backTrack = (index, sum) => {
    //     if(index === nums.length) {
    //         if(sum === target) {
    //             count++
    //         }
    //         return;
    //     }
    //     sum += nums[index];
    //     backTrack(index + 1, sum);
    //     sum -= nums[index];
    //     sum += -nums[index];
    //     backTrack(index + 1, sum);
    //     sum -= -nums[index];
    // }
    // backTrack(0, 0)
    // return count;

    let count = 0
    var backTrack = (index, sum) => {
        if(index === nums.length) {
            if(sum === target) {
                count++
            }
            return;
        }
        // sum += nums[index];
        backTrack(index + 1, sum + nums[index]);
        // sum -= nums[index];
        // sum += -nums[index];
        backTrack(index + 1, sum - nums[index]);
        // sum -= -nums[index];
    }
    backTrack(0, 0)
    return count;
};

console.log(findTargetSumWays([1,1,1,1,1], 3));
console.log(findTargetSumWays([1], 1));
console.log(findTargetSumWays([1,1,1,1,1,1,1,1], 4));