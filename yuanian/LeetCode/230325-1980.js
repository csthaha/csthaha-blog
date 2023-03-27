/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function(nums) {
    // 先转成十进制数字。然后随便一个数转成二进制

    var tenNum = str => {
        let num = 0
        for(let i = 0; i < str.length; i++) {
            let p = str.length - 1 - i;
            num += (+str[i]) * Math.pow(2, p)
        }
        return num
    }

    let list = nums.map(item => tenNum(item));

    list.sort((a, b) => a - b);
    let ans;
    for(let i = 0; i <= Math.pow(2, list.length) - 1; i++) {
        if(list.indexOf(i) === -1) {
            ans = i;
            break;
        }
    }
    // 十进制 转成 二进制
    var twoNum = num => {
        if(num === 0) return '0'.repeat(nums[0].length);
        let queue = [];
        while(num) {
            let mod = num % 2;
            num = num >> 1;
            queue.push(mod)
        }
        return queue.reverse().join('')
    }

    // return twoNum(ans);
    let result = twoNum(ans);

    return result.length === nums[0].length ? '0'.repeat(nums[0].length - result.length) + result

};
console.log(
    findDifferentBinaryString(["01", "10"])
);
console.log(
    findDifferentBinaryString(["00","01"])
);