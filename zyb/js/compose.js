/**
 * 函数组合: 将多个函数拼凑在一起产生一个新的函数
 */

// 返回一段字符串
function greeting(name) {
    return `hi ${name}`
}

// 字符串进行大写
function toUpperCase(str) {
    return str.toUpperCase()
}

// 添加 str

function addStr(str) {
    return str + ' goodmorning '
}

//Q: f ？ 初始函数具体是什么 ？？？
// function compose(...fns) {
//     return fns.reduce((f, g) => {
//         return (...rest) => {
//             return f(g(...rest))
//         }
//     })
// }

// 该方式相对于 上面那种更容易让人接受， f 为初始值input 可以设置可以不设置
const compose = (...fns) => input => fns.reduce((f, g) => g(f), input)

const res = compose( greeting, addStr, toUpperCase)('cst')

console.log('res is', res);


/**
 * 在B端业务开发中，经常会遇到处理表单内容的情况，
 * 举个例子：对用户提交的表单数据做一定的处理：1.清除空格 2. 全部转大写。
        首先我们从函数式编程的思维上分析一下：
        抽象：每个处理过程都是一个纯函数
        组合：通过compose组合处理函数
        扩展：通过添加或删除需要的处理纯函数即可
 */

// 清除前后空格

function trim(str) {
    return str.trim()
}

// 实现遍历对象函数

function traverse(obj, handler) {
    if(typeof obj !== 'object') return handler(obj)
    const copy = {}
    Object.keys(obj).forEach(key => {
        copy[key] = traverse(obj[key], handler)
    });
    return copy
}

let form = {
    name: 'zyb',
    addr: {
        p: ' j x ',
        c: ' ga'
    }
}

let resForm = traverse(form, compose(trim, toUpperCase))
console.log(resForm);