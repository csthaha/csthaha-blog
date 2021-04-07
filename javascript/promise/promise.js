

var p1 = Promise.resolve(1)
var p2 = Promise.resolve(2)
var p3 = Promise.resolve(3)


Promise.all([p1,p2,p3]).then(res => {
    console.log(res)    // [1,2,3]
})

//promise数组中任何一个promise为reject的话，
//则整个Promise.all调用会立即终止，并返回一个reject的新的promise对象。
var p1 = Promise.resolve(1),
    p2 = Promise.reject(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    //then方法不会被执行
    console.log(results); 
}).catch(function (e){
    //catch方法将会被执行，输出结果为：2
    console.log(2);
}).finally(() => {
    console.log('promise 执行完毕')
})
// promise.finally 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 promise 状态到底是  
// resolve 还是 reject 。这表明，finally 方法里面的操作，应该是与状态无关的，不依赖于 promise 的执行 结果
// 所以最终都会执行。

var http = require('http');

function getURL(URL) {
    return new Promise(function(resolve, reject){
	http.get(URL, function(res) {
	    resolve(res);
	}).on('error', function(e) {
	    reject(e);
	});
    });
}
var itbilu = getURL('http://itbilu.com');
var yijiebuyi = getURL('http://yijiebuyi.com');

Promise.all([itbilu, yijiebuyi]).then(function(results){
    results.forEach(function(result){
	setTimeout(() => {
        console.log(result.statusCode);
    }, 1000)
    });
}).catch(function(err){
    console.log(err);
});