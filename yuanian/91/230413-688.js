/**
 * @param {number} n    棋盘大小 n x n
 * @param {number} k    步数
 * @param {number} row  启始位置 行坐标
 * @param {number} column 纵坐标    
 * @return {number}
 */
var knightProbability = function(n, k, row, column) {
    // if(k === 0) return 1;
    // const direction = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
    // let ans = 0
    // let total = 0;
    // const help = (r, c, rk, path) => {
    //     path.push([r, c])
    //     if(
    //         (r < 0 && c <= 0) || 
    //         (r < 0 && c >= 0) ||
    //         (r >= 0 && c < 0) ||
    //         (r > n - 1) ||
    //         (c < 1 - n) || 
    //         c > n - 1
    //     ) {
    //         return
    //     } else {
    //         if(rk === 0) {
    //             ans += 1;
    //             return;
    //         }
    //     }
    //     for(const [row, col] of direction) {
    //         let nr = r + row;
    //         let nc = c + col;
    //         total += 1;
    //         help(nr, nc, rk - 1, path)
    //         path.pop()
    //     }
    // }

    // help(row, column, k, []);
    // return ans / Math.pow(8, k)

    // 以上回溯方法超市了

    // 可移动的方向
    const direction = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
    // 初始化状态
    const dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0).map(() => new Array(n).fill(0)));
    // 当前位置走到下个位置的概率为 1/8: dp[step][i][j] += dp[step - 1][ni][nj] / 8
    for(let step = 0; step <= k; step++) {
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < n; j++) {
                if(step === 0) {
                    dp[step][i][j] = 1;
                } else {
                    for(const [row, col] of direction) {
                        const ni = i + row;
                        const nj = j + col;
                        if(ni >= 0 && ni < n && nj >= 0 && nj < n) {
                            dp[step][i][j] += dp[step - 1][ni][nj] / 8
                        }
                    }
                }
            }
        }
    }
    return dp[k][row][column]
};

console.log(
    knightProbability(3,2,0,0)
);
console.log(
    knightProbability(3, 1, 0, 0)
);
console.log(
    knightProbability(3, 1, 1, 2)
);
console.log(
    knightProbability(8, 30, 6, 4)
);



// 超出时间限制。

