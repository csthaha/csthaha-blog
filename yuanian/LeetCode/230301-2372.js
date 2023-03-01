/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var largestLocal = function(grid) {
    // 获取 i, j 为中心的 3 x 3 数据
    const len = grid.length;
    const help = (i, j) => {
        const list = [];
        for(let m = i - 1; m < i + 2; m++){
            for(let n = j - 1; n < j + 2; n++) {
                if(m < 0 || n < 0 || len < m || len < n) continue;
                list.push(grid[m][n])
            }
        }
        return list.sort((a, b) => b - a)[0];
    }
    const res = [];
    for(let k = 0; k < len - 2; k++) {
        const arr = []
        for(let l = 0; l < len - 2; l++) {
            arr.push(help(k + 1, l + 1))
        }
        res.push(arr)
    }

    return res;
};

console.log(
    largestLocal([[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]])
);
// [[9,9],[8,6]]

console.log(
    largestLocal([[1,1,1,1,1],[1,1,1,1,1],[1,1,2,1,1],[1,1,1,1,1],[1,1,1,1,1]])
);
// [[2,2,2],[2,2,2],[2,2,2]]