// 给你一个整数数组 arr ，请你删除最小 5% 的数字和最大 5% 的数字后，剩余数字的平均值。

// 与 标准答案 误差在 10-5 的结果都被视为正确结果。

// 输入：arr = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3]
// 输出：2.00000
// 解释：删除数组中最大和最小的元素后，所有元素都等于 2，所以平均值为 2 。

// 输入：arr = [6,2,7,5,1,2,0,3,10,2,5,0,5,5,0,8,7,6,8,0]
// 输出：4.00000


var trimMean = function(arr) {
    // const arr = [6,2,7,5,1,2,0,3,10,2,5,0,5,5,0,8,7,6,8,0];

    // const sortArr = arr.sort((a, b) => a - b)

    // const leaveArr = sortArr.slice(arr.length * 0.05, arr.length - arr.length * 0.05)

    // const res = leaveArr.reduce((sum, cur) => sum + cur, 0) / leaveArr.length

    return (
        arr
            .sort((a, b) => a - b)
            .slice(arr.length * 0.05, arr.length - arr.length * 0.05)
            .reduce((sum, cur) => sum + cur, 0) / (arr.length * 0.9)
    )

}

console.log(trimMean([1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3]));
console.log(trimMean([6,2,7,5,1,2,0,3,10,2,5,0,5,5,0,8,7,6,8,0]));
console.log(trimMean([4,8,4,10,0,7,1,3,7,8,8,3,4,1,6,2,1,1,8,0,9,8,0,3,9,10,3,10,1,10,7,3,2,1,4,9,10,7,6,4,0,8,5,1,2,1,6,2,5,0,7,10,9,10,3,7,10,5,8,5,7,6,7,6,10,9,5,10,5,5,7,2,10,7,7,8,2,0,1,1]));