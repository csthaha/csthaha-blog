/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    // 回溯 

    const h = board.length;
    const w = board.length;

    const visited = new Array(h);

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for(let i = 0; i < visited.length; i++) {
        visited[i] = new Array(w).fill(false);
    }

    // i, j 为索引。s 目标字符串 k 为需要取字符的索引
    var help = (i, j, s, k) => {
        if(board[i][j] !== s.charAt(k)) {
            return false
        } else if(k === s.length - 1) {
            return true;
        }
        visited[i][j] = true;
        let result = false;
        for(const [dx, dy] of directions) {
            let newi = i + dx
            let newj = j + dy
            if(newi >= 0 && newi < h && newj >= 0 && newj < w) {
                if (!visited[newi][newj]) {
                    const flag = help(newi, newj, s, k + 1);
                    if (flag) {
                        result = true;
                        break;
                    }
                }
            } 
        }
        visited[i][j] = false;
        return result;
    }

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const flag = help(i, j, word, 0);
            if (flag) {
                return true;
            }
        }
    }
    return false;
};

console.log(
    exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")
);