/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function(blocks, k) {
    let len =  blocks.length;
    let min = len;
    for(let i = 0; i <= len - k; i++) {
        let cur = blocks.slice(i, k+ i);
        let count = 0;
        for(let j = 0; j < k; j++) {
            if(cur[j] === 'W') {
                count++;
            }
        }
        min = Math.min(min, count)
    }
    return min;
};

console.log(
    minimumRecolors("WBBWWBBWBW", 7)
);
console.log(
    minimumRecolors("WBWBBBW", 2)
);