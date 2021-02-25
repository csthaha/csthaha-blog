/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
    A.map(item => item.reverse())
    for(let i = 0; i < A.length; i++) {
        for(let j = 0; j < A[i].length; j++) {
            A[i][j] == 0 ? A[i][j] = 1 : A[i][j] = 0
        }
    }
    return A
};

console.log(flipAndInvertImage([[1,1,0],[1,0,1],[0,0,0]]))