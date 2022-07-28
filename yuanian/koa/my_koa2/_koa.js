import http from 'http'
import compose from './compose.js';

import middlwareFn from './middlewareFn.js'

class _koa {
    constructor() {
        this.middlware = []
    }

    listen(...args) { 
        //最底部还是使用了原生的createServer
        const server = http.createServer(
            this.callback()
        ); //具体看看callback返回的是什么方法zfa
        return server.listen(...args); 
    } 

    use(fn) {
        this.middlware.push(fn);
    }

    callback() {
        return middlwareFn(this.middlware)(); 
    }
}

export default _koa