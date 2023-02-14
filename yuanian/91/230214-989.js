// 对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。
// 例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。
// 给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。
// 示例 1：
// 输入：A = [1,2,0,0], K = 34
// 输出：[1,2,3,4]
// 解释：1200 + 34 = 1234
// 示例 2：

// 输入：A = [2,7,4], K = 181
// 输出：[4,5,5]
// 解释：274 + 181 = 455
// 示例 3：

// 输入：A = [2,1,5], K = 806
// 输出：[1,0,2,1]
// 解释：215 + 806 = 1021
// 示例 4：

// 输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
// 输出：[1,0,0,0,0,0,0,0,0,0,0]
// 解释：9999999999 + 1 = 10000000000

// 提示：
// 1 <= A.length <= 10000
// 0 <= A[i] <= 9
// 0 <= K <= 10000
// 如果 A.length > 1，那么 A[0] != 0

/**
 * 给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。
 * @param {*} arr 非负整数 X 的数组形式 
 * @param {*} k 整数
 */
function addSum(arr, k) {
    // k 数组形式
    const strK = String(k)
    const arrK = []
    for(let i = 0; i < strK.length; i++) {
        arrK.push(+strK[i])
    }
    let pos = 0 // 进位
    const longArr = arrK.length > arr.length ? arrK : arr
    for(let j = 0; j < longArr.length; j++) {
        const A = arrK[arrK.length - 1 - j];
        const B = arr[arr.length - 1 - j];
        const sum = (A || 0) + (B || 0) + pos;
        const res = sum % 10;
        pos = Math.floor(sum / 10)
        // console.log(pos, sum, res, j);
        longArr[longArr.length - 1 - j] = res;
    }
    if(pos) {
        longArr.unshift(pos)
    }
    return longArr
}


console.log(
    addSum([1,2,0,0], 34)
);
console.log(
    addSum([2,7,4], 181)
);
console.log(
    addSum([2,1,5], 806)
);
console.log(
    addSum([9,9,9,9,9,9,9,9,9,9], 1)
);
// console.log(
//     addSum([1,2,6,3,0,7,1,7,1,9,7,5,6,6,4,4,0,0,6,3], 516)
// );