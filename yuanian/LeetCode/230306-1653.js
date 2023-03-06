// 输入：s = "aababbab"
// 输出：2
// 解释：你可以选择以下任意一种方案：
// 下标从 0 开始，删除第 2 和第 6 个字符（"aababbab" -> "aaabbb"），
// 下标从 0 开始，删除第 3 和第 6 个字符（"aababbab" -> "aabbbb"）。

// 输入：s = "bbaaaaabb"
// 输出：2
// 解释：唯一的最优解是删除最前面两个字符。


/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function(s) {
    let aIndex = [],
        bIndex = []
    for(let i = 0; i < s.length; i++) {
        if(s[i] === 'a') {
            aIndex.push(i);
        } else {
            bIndex.push(i);
        }
    }
    let typeOne = 0;
    // 全删 a 
    for(let i = aIndex.length; i >= 0; i--) {
        if(aIndex[i] > bIndex[0]) {
            typeOne++;
        }
    }
    // 全删 b
    let typeTwo = 0
    for(let j = 0; j < bIndex.length; j++) {
        if(aIndex[aIndex.length - 1] > bIndex[j]) {
            typeTwo++;
        }
    }

    // 又删a、又删b 
    let typeThree = 0
    // 分割线。左侧删b 右侧删a
    // 遍历确定分割线
};

// console.log(
//     minimumDeletions("aababbab")
// );
// console.log(
//     minimumDeletions("bbaaaaabb")
// );
console.log(
    minimumDeletions("ababaaaabbbbbaaababbbbbbaaabbaababbabbbbaabbbbaabbabbabaabbbababaa")
);