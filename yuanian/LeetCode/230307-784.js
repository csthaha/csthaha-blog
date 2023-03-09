// 784. 字母大小写全排列

// 给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。
// 返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。

// 输入：s = "a1b2"
// 输出：["a1b2", "a1B2", "A1b2", "A1B2"]

// 输入: s = "3z4"
// 输出: ["3z4","3Z4"]

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function(s) {
    const res = [];
    s = s.toLowerCase();
    const backTrack = (path, index) => {
        if(path.length === s.length) {
            res.push(path.slice());
            return;
        }
        path += s[index];
        backTrack(path, index + 1);
        if(isNaN(+s[index])) {
            path = path.slice(0, path.length - 1);
            path += s[index].toUpperCase()
            backTrack(path, index + 1)
        }
    }
    backTrack('', 0)
    return res;
};

console.log(
    letterCasePermutation("3z4")
);
console.log(
    letterCasePermutation("a1b2")
);
console.log(
    letterCasePermutation("C")
);
console.log(
    letterCasePermutation("0")
);