/**
 * @param {number[]} nums
 * @param {number[]} l
 * @param {number[]} r
 * @return {boolean[]}
 */
var checkArithmeticSubarrays = function(nums, l, r) {
    // 该题就是为了求数组能否够成等差数列。
    var arithmeticSubarrays = list => {
        // 判断是否是等差数列
        if(list.length <= 1) return false;
        list.sort((a, b) => a - b);
        let distance = list[1] - list[0]
        for(let i = 2; i < list.length; i++) {
            if(list[i] - list[i - 1] !== distance) {
                return false;
            }
        }
        return true;
    }
    const ans = [];
    for(let i = 0 ; i < l.length; i++) {
        ans.push(arithmeticSubarrays(nums.slice(l[i], r[i] + 1)))
    }

    return ans;
};

console.log(
    checkArithmeticSubarrays(
        [4,6,5,9,3,7],
        [0,0,2],
        [2,3,5]
    )
);