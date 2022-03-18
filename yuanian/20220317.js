// compose 组合函数

/**
 * 简单例子：统计一段字符串的单词个数
 * fun1: 字符串转数组
 * fun2: 数组长度即单词个数
 */

 const fun1 = str => str.split(" ");
 const fun2 = arr => arr.length;
 const fun3 = str => str + "hhhh";
 
 // compose1、2 两种写法都可以。主要是 reduce 是否传入两个参数

 // 注：第二个参数不传的时候 reduce 回调的第一个参数为数组的第一个参数
//  那么 如果是函数则需要传入一个参数

 const compose1 = (...fns) => fns.reduce((f1, f2) => x => f2(f1(x)));
 const compose2 = (...fns) => x => fns.reduce((params, f) => f(params), x);
 
 const wordLen1 = compose1(fun1, fun2, fun3);
 console.log(wordLen1("I am from jx"));
 
 const wordLen2 = compose2(fun1, fun2, fun3);
 console.log(wordLen2("My age is 18"));
 