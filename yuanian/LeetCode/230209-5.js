/** 最长回文字串
 * @param {string} s
 * @return {string}
 */

//  输入：s = "babad"
//  输出："bab"
//  解释："aba" 同样是符合题意的答案。

// 解题思想错误。 X
// var longestPalindrome = function(s) {
//     const res = []; // 回文字符子串数组
//     for(let i = 0; i < s.length; i++) {
//         let fe = i;
//         let end = s.length - 1;
//         let str = ''
//         let count = 0
//         let startIndex = 0;
//         let endIndex = 0;
//         while(fe < end) {
//             if(s[fe] === s[end]) {
//                 count++;
//                 if(count === 1) {
//                     startIndex = i;
//                     endIndex = end
//                 }
//                 str += s[fe]+s[end]
//                 end--;
//                 fe++;
//                 if(fe >= end) {
//                     console.log(fe, end);
//                     res.push(s.slice(startIndex,endIndex + 1))
//                 }
//             } else {
//                 end--;
//                 // console.log(444444, fe, end);
//                 // if(fe < i) {
//                 //     break;
//                 // }
//             }
//         }
//     }
    // return res.length === 0 ? s[0] : res.reduce((a, b) => a.length > b.length ? a : b)
// };

//双指针思想没错 不仅可以两端往内，有时也可以向两端扩散。！！！


//关键是 还需要用到从中心向外扩散的思想。即可。
var longestPalindrome = function(s) {
    let res = '';
    for(let i = 0; i < s.length; i++) {
        help(i, i); // s.length 为偶数情况
        help(i, i + 1); // s.length 为奇数情况
    }
    // 主要思想：
    function help(l, r) {
        // 定义左右双指针  // 左指针往左走，右指针往右走。
        while(l >= 0 && r < s.length && s[l] === s[r]) {
            l--
            r++
        }
        // 拿到回文字符， 注意 上面while满足条件后多执行了一次，所以需要l+1, r+1-1
        const maxStr = s.slice(l + 1, r + 1 - 1);
        // 取最大长度的回文字符
        if (maxStr.length > res.length) res = maxStr
    }

    return res
}

console.log(
    longestPalindrome("babad")
);
console.log(
    longestPalindrome("cbbd")
);
console.log(
    longestPalindrome("abcddcba")
);
console.log(
    longestPalindrome("xyzxxxxxxz")
);


console.log(
    longestPalindrome('aacabdkacaa')
);

