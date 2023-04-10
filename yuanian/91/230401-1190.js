/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    const stack = [];
    // 栈存储 存当前层级、字符。
    let count = 0;
    let str = '';
    for(let item of s) {
        if(item === '(') {
            count++;
            stack.push([count, str])
            str = ''
        } else if(item === ')') {
            count--;
            stack.pop
        } else {
            str += item;
        }
    }
    console.log(stack, str);
};

reverseParentheses("(abcd)");
reverseParentheses("(u(love)i)");
reverseParentheses("(ed(et(oc))el)");