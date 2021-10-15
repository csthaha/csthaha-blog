## HTTP

#### 强缓存、协商缓存   
> 良好的缓存策略不仅可以减少请求资源的重复次数，还可以降低延迟，提升加载速度。

浏览器的缓存机制：

> 浏览器缓存分为两种：强缓存 *(Expires, cache-control)* 和协商缓存 **(Last-modified、Etag)**。具体使用哪种缓存机制是通过 http header 字段的不同来选择的。

- 原理：
1. 浏览器在加载资源的时候，根据资源的 http header 的 expires 和 cache-control 来判断是否命中强缓存。命中则直接从缓存中读取资源，不会发送请求到浏览器。
2. 如果没有命中强缓存，浏览器会发送请求到服务器，再通过 http的请求头（header），last-modified和etag验证资源是否命中协商缓存。如果命中，服务器会将这个请求返回（也就是 304）, 但是不会返回这个请求的资源，依然是从缓存中读取资源。
3. 如果都不是，则返回请求，返回资源。
- 区别：
1. 强缓存和协商缓存都是从客服端缓存中加载资源，而不是从服务器加载资源数据。
2. 强缓存不发送请求到服务器，协商缓存会

##### 强缓存（expires、cache-control）
- expires （过期）
> Expires 是 HTTP/1.0 控制网页缓存，由服务器返回表示资源过期的header的字段。
它是一个由服务器返回的绝对时间，如果请求发生时间在 expires 之前，那么本地缓存始终有效，否则就会发送请求到服务器。

- cache-control
> cache-control 也是HTTP/1.0控制网页缓存的字段。优先级高于 expires 的，是相对时间。
1. Cache-control: no-cache 实际上是可以存储在本地缓存区中的。只是在与原始服务器进行新鲜度再验证之前，缓存不能将其提供给客户端使用。
2. no-store 不缓存数据到本地。
3. public 可以被所有用户缓存（多用户共享），包括终端和CDN等中间代理服务器
4. private 只能被终端浏览器缓存（而且是私有缓存），不允许中断缓存服务器进行缓存。

- disk cache 和 memory cache
> 强缓存又分为内存缓存（memory cache）和硬盘缓存（disk cache）。
>
> > 内存缓存 有两个特点 快速读取 和 时效性。快速读取：将解析编译资源放入到进程当中，占据一定内存资源，方便下次快速读取; 时效性：一旦关闭进程，进程的内存就会被清空。
>
> > 硬盘缓存将数据写入磁盘文件，读取缓存需要读取硬盘文件进行 I/O 操作，然后重新解析该缓存内容，读取复杂，速度比内存缓慢。

##### 协商缓存

- Last-Modified

> 当浏览器的某个资源的请求没有命中强缓存，就会发送一个请求到服务器，验证协商缓存是否命中，如果协商缓存命中，请求响应返回的http状态为 304 并且会显示一个 Not Modified的字符串。

**过程：**

1. 浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，会在 response 的 Header 的 Last-Modified 值设置为，该资源最后修改的时间；

2. 第二次请求的时候，在 Request 的 Header 上加上 If-Modified-since, 值为上次请求资源的 Last-Modified；

3. 服务器收到 If-Modified-since 与服务器文件的 Last-Modified 对比：

   - 命中：没有变换则返回 304，不返回资源。浏览器收到 status： 304，则使用本地缓存；不更新 Last-Modified

   - 不命中：有变化返回 200， 重新更新 Last-Modified，返回 200，返回资源。

- ETag

> ETage 是服务器响应请求时，返回当前资源文件的一个唯一 标识（由服务器生成。）

参考:

[浏览器缓存之强缓存与协商缓存](https://juejin.cn/post/6844904067882287111#heading-8)

[缓存（二）——浏览器缓存机制：强缓存、协商缓存 #41](https://github.com/amandakelake/blog/issues/41)

#### [输入 url 后发生了什么（输入 url 到页面渲染经历了哪些过程）](https://juejin.cn/post/6844904110471249934#heading-3)
答：从耗时过程来看，可以分为 DNS解析、TCP连接、HTTP请求与响应、客户端浏览器解析渲染、连接结束。
其中浏览器解析渲染包含：HTML词法、语法的解析、CSS解析、DOM树生成、渲染树建立、屏幕绘制。

- [DNS解析:](https://user-gold-cdn.xitu.io/2020/3/31/1712e6a3e1baa4d9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
当我们在浏览器中输入如 `www.taobao.com` 的时候，DNS解析充当了一个翻译的角色，把网址 '翻译' 成了 IP地址。DNS解析的过程就是域名到IP地址的转换的过程。域名解析也叫域名指向、服务器设置、域名设置以及反向IP登记等等。说的简单点就是好记的域名解析成IP，服务由DNS服务器完成，把域名解析到一个IP地址，然后在此IP地址的主机上将一个子目录与域名绑定。

- [TCP连接:](https://user-gold-cdn.xitu.io/2020/3/31/1712e6a1bea48247?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
TCP连接的重要目的，是为了保证消息的有序和不丢包，为了建立可靠的数据传输，TCP通信双方相互告知初始化序列号，并确定对方已经收到SN的，整个链接的过程就是我们俗称的三次握手。

- HTTP请求与响应：HTTP请求它主要发生在客户端，发送HTTP请求的过程就是构建HTTP请求报文并通过TCP协议发送到服务器指定端口的过程。
当在地址栏输入后，浏览器会分析这个url，并设置好请求报文发出。请求报文中包括请求行（包括请求的方法，路径和协议版本）、请求头（包含了请求的一些附加信息，一般是以键值的形式成对存在）、空行（协议中规定请求头和请求主体间必须用一个空行隔开）、请求体（对于post请求，所需要的参数都不会放在 url 中，这时候就需要一个载体了，这个载体就是请求主体）。服务端收到这个请求后，会根据 url 匹配到的路径做相应的处理，最后返回浏览器需要的页面资源。处理后，浏览器会收到一个响应报文，而所需要的资源就在报文主体上。与请求报文相同，响应报文也有与之对应的起始行（响应报文的起始行同样包含了协议版本，与请求的起始行不同的是包含的还有状态码和状态码的原因短语）、响应头（对应请求报文中的请求，格式一致，但是各自有不同的首部）、空行、报文主体（请求所需要的资源），不同的地方在于包含的东西不一样。

- HTML语法、语法解析
对我们来说HTML其实是一坨字符串，而实际上我们要面对的是'字符流'。为了把字符流解析成正确的可被浏览器识别的结构，我们需要做的事情分为两步：
   - 词法分析：把字符流初步解析成我们可理解的词，学名叫 token。
   - 词法分析：把开始结束标签配对、属性赋值好、父子关系连接好、构成dom树。
html结构其实不算太复杂，我们平时见到的大部分都只是标签、属性、注释、CDATA节点。

- [屏幕绘制](https://user-gold-cdn.xitu.io/2020/3/31/1712e6a1baef9cd8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
DOM树的生成和渲染树建立比较好理解。两棵树构造后，就进入屏幕绘制阶段。
在绘制的过程中，会遍历渲染树，调用由浏览器的ui组件的paint()方法在屏幕上显示对应的内容，并根据渲染树布局，计算css样式(即每个节点在页面中的大小和位置等几何信息)。

HTML默认是从上到下流式布局的，css 和 js 的加入会打破这种布局，改变DOM的外观样式以及大小和位置。这就引出两个非常重要的概念：replaint重绘和reflow重排。

replaint重绘，屏幕的一部分重新绘制，不影响整体布局，比如某个 css 的背景色变了，但元素的几何尺寸和位置不变。eflow重排：意味着元件的几何尺寸变了，我们需要重新验证并计算渲染树。是渲染树的一部分或全部发生了变化。无论是重绘还是重排，对浏览器而言都是一种消耗，所以我们应该尽量减少这两种状态的触发。
