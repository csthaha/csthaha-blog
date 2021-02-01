/** leetcode 888 糖果交换
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var fairCandySwap = function(A, B) {
    let res = []
    let sA = A.reduce((a, b) => a + b, 0)
    let sB = B.reduce((a, b) => a + b, 0)
    let sAB = (sA + sB) / 2
    let diff = Math.abs(sA - sAB)
    for(let i = 0; i < A.length; i++) {
        for(let j = 0; j < B.length; j++) {
            if(Math.abs(A[i] - B[j]) === diff && (sA - A[i] + B[j]) === (sB - B[j] + A[i])) {
                res = [A[i], B[j]]
            }
        }
    }
    return res;
};

console.log(fairCandySwap([1,1],[2,2]));