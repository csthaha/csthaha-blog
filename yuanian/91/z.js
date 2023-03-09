/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let res = '',
        count = 0;
    for(let i = 0; i < s.length; i++) {
        if(res.indexOf(s[i]) > -1) {
            // 存在
            res = res.slice(res.indexOf(s[i]) + 1)
        }
        res += s[i];
        count = Math.max(count, res.length)
    }
    return count;
};

console.log(
    lengthOfLongestSubstring("abcabcbb")
);
console.log(
    lengthOfLongestSubstring("abcabcbbqwert")
);
console.log(
    lengthOfLongestSubstring("bbbbb")
);
console.log(
    lengthOfLongestSubstring("pwwkew")
);