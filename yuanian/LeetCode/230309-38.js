/**
1.     1
2.     11
3.     21
4.     1211
5.     111221
第一项是数字 1 
描述前一项，这个数是 1 即 “ 一 个 1 ”，记作 "11"
描述前一项，这个数是 11 即 “ 二 个 1 ” ，记作 "21"
描述前一项，这个数是 21 即 “ 一 个 2 + 一 个 1 ” ，记作 "1211"
描述前一项，这个数是 1211 即 “ 一 个 1 + 一 个 2 + 二 个 1 ” ，记作 "111221"
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    const map = {
        1: '1'
    }
    const dp = n => {
        if(n === 1)  return "1";
        if(map[n]) return map[n];
        let last = dp(n - 1);
        let res = ''
        let count = 0;
        let l = 0;
        for(let i = 0; i < last.length; i++) {
            if(last[l] === last[i]) {
                count++;
            } else {
                res += `${count}${last[l]}`;
                l = i;
                count = 1;
            }
            
        }
        res += `${count}${last[l]}`
        map[n] = res;
        return res;
    }

    return dp(n)
};

console.log(
    countAndSay(5),
    countAndSay(6)
);