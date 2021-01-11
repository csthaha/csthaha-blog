/**
 * node 本地服务器
 */

 const PORT = '8888';  // 端口
 var http = require('http');    // 导入 http

 var server = http.createServer(function(request, response) {
    response.write('this is a simple serve')
    response.end()
 })

 server.listen(PORT)
 console.log('Server is running at port: ', PORT)
