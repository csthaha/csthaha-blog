// 给你一个字符串 sequence ，如果字符串 word 连续重复 k 次形成的字符串是 sequence 的一个子字符串，
// 那么单词 word 的 重复值为 k 。单词 word 的 最大重复值 是单词 word 在 sequence 中最大的重复值。
// 如果 word 不是 sequence 的子串，那么重复值 k 为 0 。

// 给你一个字符串 sequence 和 word ，请你返回 最大重复值 k 。

// 输入：sequence = "ababc", word = "ab"
// 输出：2
// 解释："abab" 是 "ababc" 的子字符串。

// 输入：sequence = "ababc", word = "ba"
// 输出：1
// 解释："ba" 是 "ababc" 的子字符串，但 "baba" 不是 "ababc" 的子字符串。

// 输入：sequence = "ababc", word = "ac"
// 输出：0
// 解释："ac" 不是 "ababc" 的子字符串。

/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
var maxRepeating = function(sequence, word) {
    let w = word;
    let flag = sequence.includes(word);
    let count = 0;
    if(!flag) return count;
    while(flag) {
        count ++;
        w += word;
        flag = sequence.includes(w);
    }
    return count;
};

`https://leetcode.cn/problems/maximum-repeating-substring/submissions/378909908/`

console.log(maxRepeating("ababc", "ab"));
console.log(maxRepeating("ababc", "ba"));
console.log(maxRepeating("ababc", "ac"));