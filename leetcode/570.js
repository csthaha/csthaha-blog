/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function(num) {
    // 找出非负整数字符串最大数字。
    const getMaxNum = strs => {
        // 假设第一个数字最大, 也是最小
        let max = strs[0];
        for (let s of strs) {
            if(+s > max) {
                max = s;
            }
        }
        return max;
    }
    const strNum = String(num);
    for(let i = 0; i < strNum.length; i++) {
        const laveStr = strNum.slice(i + 1);
        const max = getMaxNum(laveStr);
        if(!laveStr) return num
        if(+max <= +strNum[i]) {
            continue;
        } else {
            console.log(maxIndex);
            const maxIndex = laveStr.lastIndexOf(max);
            const numArr = strNum.split('');
            const leaveArr = laveStr.split('');
            leaveArr[maxIndex] = strNum[i];
            numArr[i] = max
            return +(numArr.join('').slice(0, i + 1) + leaveArr.join(''))
        }
    }
};

// console.log(maximumSwap(2736));
// console.log(maximumSwap(1993));
console.log(maximumSwap(9931));
// console.log(maximumSwap(98368));
