import delegate from 'delegates'
// proto就是返回的实例
const proto = {
}

// context.js 主要是为ctx 增加相关的属性和⽅法 
// 使⽤delegate 模块（作用是给一个对象上赋相关的属性和方法）
//完成把request 和 response对象上的变量或者函数绑定在context 对象上。 

delegate(proto, 'response') 
 .method('attachment') 
 .method('redirect') 
 .method('remove') 
 .method('vary') 
 .method('has') 
 .method('set') 
 .method('append') 
 .method('flushHeaders') 
 .access('status') 
 .access('message') 
 .access('body') 
 .access('length') 
 .access('type') 
 .access('lastModified') 
 .access('etag') 
 .getter('headerSent') 
 .getter('writable'); 
 
 /** 
 * Request delegation. 
 */ 
delegate(proto, 'request') 
 .method('acceptsLanguages') 
 .method('acceptsEncodings') 
 .method('acceptsCharsets') 
 .method('accepts') 
 .method('get') 
 .method('is') 
 .access('querystring') 
 .access('idempotent') 
 .access('socket') 
 .access('search') 
 .access('method') 
 .access('query') 
 .access('path') 
 .access('url') 
 .access('accept') 
 .getter('origin') 
 .getter('href') 
 .getter('subdomains') 
 .getter('protocol') 
 .getter('host') 
 .getter('hostname') 
 .getter('URL') 
 .getter('header') 
 .getter('headers') 
 .getter('secure') 
 .getter('stale') 
 .getter('fresh') 
 .getter('ips') 
 .getter('ip'); 
 
export default proto