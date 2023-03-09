/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    // 满足条件的字串长度。
    words.sort();
    let wordLen = words[0].length
    let slen = words.length * wordLen;
    if(s.length < slen) return [];
    const res = [];
    for(let i = 0; i <= s.length - slen; i++) {
        let curS = s.slice(i, slen + i);
        // 长度 len 分一组。
        const curArr = [];
        while(curS.length) {
            curArr.push(curS.slice(0, wordLen));
            curS = curS.slice(wordLen);
        }
        // 不能使用该方式判断。words 中可能存在相同的字符串。
        // if(
        //     [...new Set(curArr)].length === words.length && 
        //     curArr.every(item => words.indexOf(item) > -1)
        // ) {
        //     res.push(i)
        // }

        // 其实就是判断两个数组是否完全相同。
        curArr.sort();
        let l = 0;
        for(let k = 0; k < words.length; k++){
            if(curArr[l] === words[k]) {
                l++;
            }
        }
        if(l === words.length) {
            res.push(i)
        }

    }
    return res;
};
console.log(findSubstring("barfoothefoobarman", ["foo","bar"]));
console.log(findSubstring("wordgoodgoodgoodbestword",["word","good","best","word"]));
console.log(findSubstring("barfoofoobarthefoobarman",["bar","foo","the"]));
// console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","good"]));