/**
 * @param {number} n
 * @return {number}
 */
var numDupDigitsAtMostN = function(n) {
    var numDupDigits = num => {
        let str = num.toString().split('');
        let reset = [...new Set(str)];
        return str.length === reset.length;
    }

    const ans = [];

    for(let i = 1; i <=n; i++) {
        if(!numDupDigits(i)) {
            ans.push(i)
        }
    }
    console.log(ans);
    return ans.length
};

numDupDigitsAtMostN(20);