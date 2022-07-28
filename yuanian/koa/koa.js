
const http = require('http');
const fs = require('fs');

http.createServer((request, response)=>{
    fs.readFile(__dirname + '/index.html', 'binary', (error, file) => {
        if(error) {
            console.log(error);
        } else {
            console.log(file);
            response.writeHead(200, {'Content-Type':'text/html'}); // 返回200正常的请求头
            response.end(file, 'binary'); //以二进制的文件作为返回格式
        }
    })
}).listen(9000);
console.log('http server start.')