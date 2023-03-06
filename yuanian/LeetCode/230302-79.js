/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let res = false;

    const backTrack = (path,r, d, index) => {
        if(path.length === word.length) {

        };
        for(let i = r; i < board.length; i++) {
            for(let j = d; j < board[0].length; j++) {
                if(path[i][j] === word[index]) {
                    path += path[i][j]
                    index += 1
                } else {
                    
                }
                backTrack(path, r + 1, d, index);
                backTrack(path, r, d + 1, index);

            }
        }
    }
    backTrack('', 0, 0, 0)
    return res;
};

console.log(
    exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], 'SEE')
);
// console.log(
//     exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], 'ABCCED')
// );
// console.log(
//     exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], 'ABCB')
// );