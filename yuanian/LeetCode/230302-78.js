/**
 * @param {number[]} nums
 * @return {number[][]}
 *  只考虑当前元素选或者不选。
 */
var subsets = function(nums) {
    const res = [];
    const backTrack = (path, index) => {
        if(index === nums.length) {
            res.push([...path]);
            return;
        }
        path.push(nums[index]) // 当前元素选择
        backTrack(path, index + 1);
        path.pop();   // 当前元素不选择。
        backTrack(path, index + 1)
    }
    backTrack([], 0)
    return res;
};

var subsets = function(nums) {
    const res = [];
    const backTrack = (path, index) => {
        if(path.length <= nums.length) {
            res.push([...path]);
        }

        for(let i = index; i < nums.length; i++) {
            path.push(nums[i]);
            backTrack(path, i + 1);
            path.pop();
        }
    }
    backTrack([], 0)
    return res;
}

console.log(
    subsets([1,2,3])
);
console.log(
    subsets([0])
);