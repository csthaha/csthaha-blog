// 给你一个整数数组 nums ，请你将数组按照每个值的频率 升序 排序。
// 如果有多个值的频率相同，请你按照数值本身将它们 降序 排序。 

// 请你返回排序后的数组。

// 输入：nums = [1,1,2,2,2,3]
// 输出：[3,1,1,2,2,2]
// 解释：'3' 频率为 1，'1' 频率为 2，'2' 频率为 3 。

// 输入：nums = [2,3,1,3,2]
// 输出：[1,3,3,2,2]
// 解释：'2' 和 '3' 频率都为 2 ，所以它们之间按照数值本身降序排序。

// 输入：nums = [-1,1,-6,4,5,-6,1,4,1]
// 输出：[5,-1,4,4,-6,-6,1,1,1]


// 改方式性能不太好 待优化。
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function(nums) {
    const countMap = {}
    for(let i = 0; i < nums.length; i++) {
        countMap[nums[i]] = countMap[nums[i]] ? countMap[nums[i]] + 1 : 1
    }
    const countArr = [...new Set(Object.values(countMap).sort((a, b) => a - b))]
    const res = []
    for(let item of countArr) {
        const keys = Object.keys(countMap)
            .filter(key => countMap[key] === item)
            .sort((a, b) => b - a)
        keys.forEach(v => {
            for(let i = 0; i < item ; i++) {
                res.push(+v)
            }
        })
    }
    return res
};

function frequencySort2(nums) {
    // 数量升序，大小降序
    const countMap = {}
    for(let i = 0; i < nums.length; i++) {
        countMap[nums[i]] = countMap[nums[i]] ? countMap[nums[i]] + 1 : 1
    }
    const descendingNums = nums.sort((a, b) => b - a).sort((m, n) => countMap[m] - countMap[n])
    return descendingNums
}

console.log(frequencySort([1,1,2,2,2,3]));
console.log(frequencySort2([1,1,2,2,2,3]));
console.log(frequencySort([2,3,1,3,2]));
console.log(frequencySort2([2,3,1,3,2]));
console.log(frequencySort([-1,1,-6,4,5,-6,1,4,1]));
console.log(frequencySort2([-1,1,-6,4,5,-6,1,4,1]));