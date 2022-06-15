/**
 * 生成 n 对有效的括号
 * @param {Number} n 
 */

// 思路： 
// 1. 通过递归生成搜有的括号。
// 2. 左右括号数相等且等于n
// 3. 右括号不能先于左括号。


function generateBrackets(n) {
    const arr = []
    function recursion(left, right, str) {
        if(left === n  && right === n) {
            arr.push(str)
            return
        }
        if(left < n) {
            recursion(left + 1, right, str + '('); // 添加左括号
        }
        if(right < left) {
            recursion(left, right + 1, str + ')'); // 添加右括号
        }
    }
    recursion(0, 0, "")
    return arr
}

console.log(generateBrackets(2));