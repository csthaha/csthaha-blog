### skulpt调研

> Sculpt 是一个可以将 python 编译成 JavaScript 的一个开源工具。可以直接在浏览器端进行运行 python 的语法代码
>
> skulpt的定位是在浏览器中能够做到 python 的能力，为的就是在线运行python。

#### 使用 [skulpt](http://skulpt.org/using.html)

通过文档可知，我们需要引入两个文件：

- 方式一：通过 clone skulpt 项目然后运行 `npm run dist`命令打包项目之后

  找到文件（dist目录下）：skulpt-stdlib.js 和 skulpt.min.js。

  ```javascript
  <script src="./skulpt.min.js" type="text/javascript"></script>
  <script src="./skulpt-stdlib.js" type="text/javascript"></script>
  ```

- 方式二：直接使用cnd链接

  ```javascript
  <script src="https://cdn.jsdelivr.net/gh/skulpt/skulpt-dist/skulpt.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/gh/skulpt/skulpt-dist/skulpt-stdlib.js" type="text/javascript"></script>
  ```

下面是一段展示skulpt运行的html,复制 body内容然后通过 live-server 的插件运行（点击 goLive）就可以看到效果

```html
<body>
    <h3>Try This</h3>
    <form>
      <textarea id="yourcode" cols="80" rows="10">
import turtle
print('hello')
t = turtle.Turtle()
t.color('red')
t.forward(75)
  </textarea
      ><br />
      <button type="button" onclick="runit()">Run</button>
    </form>
    <pre id="output"></pre>
    <div id="mycanvas"></div>
    <script>
      function outf(text) {
        var mypre = document.getElementById("output");
        mypre.innerHTML = mypre.innerHTML + text;
      }
      function builtinRead(file) {
        console.log("Attempting file: " + Sk.ffi.remapToJs(file));
        if (
          Sk.builtinFiles === undefined ||
          Sk.builtinFiles.files[file] === undefined
        ) {
          throw "File not found: '" + file + "'";
        }

        return Sk.builtinFiles.files[file];
      }
      function runit() {
        var prog = document.getElementById("yourcode").value;
        var mypre = document.getElementById("output");
        mypre.innerHTML = "";
        Sk.pre = "output";
        Sk.configure({
          output: outf,
          read: builtinRead,
          __future__: Sk.python3,
        });

        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "mycanvas";
        var myPromise = Sk.misceval.asyncToPromise(function() {
          return Sk.importMainWithBody("<stdin>", false, prog, true);
        });

        myPromise.then(
          function(mod) {
            console.log("success");
          },
          function(err) {
            console.log(err.toString());
          }
        );
      }
    </script>
  </body>
```

**如果通过 live-server 命令运行或者通过本地的方式运行出现一些 xxx is undefined 的报错，那么可能是配置或者一些其他的问题。这时候通过安装 vscode 的插件 live-server 然后点击 vscode 的右下角有个 goLive 进行运行 html。**

### 引入第三方模块

> Turtle 是 python 的内置模块且 skulpt 也实现了该模块，通过在运行之后的 html 的浏览器通知台 使用命令 `Sk.builtinFiles.files`可以查看 skulpt 所内置的所有模块

那么第三方模块我们是如何导入的呢？

通过 externalLibs 进行配置：

```javascript
// 第三方模块列表
      var externalLibs = {
        // 确保模块路径能访问到，这里我用的是相对路径
        "./moduleName/__init__.js": "./moduleName.js", 
      };
```

#### 如 zyb 模块：

1. 我们先新建一个 `zyb.js`：

   ```javascript
   var $builtinmodule = function (name) {
   	var sc = '根据关键词搜索的诗句',
   		keyword = '关键词'
   	var zyb = {__name__: new Sk.builtin.str("zyb")}
   	zyb.add = new Sk.builtin.func(function(a, b, c) {
           return Sk.ffi.remapToJs(a) + Sk.ffi.remapToJs(b) + Sk.ffi.remapToJs(c);
   		// return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
   		// 	Sk.setTimeout(function() {
   		// 		resolve(Sk.ffi.remapToJs(a) + Sk.ffi.remapToJs(b) + Sk.ffi.remapToJs(c));
   		// 	}, Sk.ffi.remapToJs(2)*1000);
   		// }));
       });
   
   	zyb.reduce = new Sk.builtin.func(function(a, b) {
           return Sk.ffi.remapToJs(a) - Sk.ffi.remapToJs(b)
       });
   
   	zyb.enter = new Sk.builtin.func(function() {
   		var tall = prompt("请输入搜索关键字","春");
   		if (tall != null){
   			keyword = tall
   			return tall
   		}else{
   			alert("你按了[取消]按钮");
   		}
   	})
   
   	zyb.shici = new Sk.builtin.func(function() {
   		// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
           var xhr = new XMLHttpRequest();
   		let key = encodeURIComponent(keyword)
   		// xhr.open('get', `/api/search?q=${key}`, false)
   		xhr.open('get', `/api/api/suggest?q=${key}`, false)
   		xhr.send(null);
   		if((xhr.status>=200&&xhr.status<300)||xhr.status==304) {
   			console.log('response:', xhr);
   			sc = xhr.responseText;
   			return sc
   		} else {
   			alert("Request was unsuccessful:"+xhr.status);
   		}
   	})
   
   	zyb.show = new Sk.builtin.func(function() {
   		// let scShow = JSON.parse(sc)
   		// alert(scShow)
   		// return scShow
   
   		var ifrm = document.createElement("iframe");
   		let key = encodeURIComponent(keyword)
           ifrm.setAttribute("src", `/api/search?q=${key}`);
           ifrm.style.width = "640px";
           ifrm.style.height = "640px";
           document.body.appendChild(ifrm);
   
   	})
   
   	zyb.showTitle = new Sk.builtin.func(function() {
   		let scShow = JSON.parse(sc)
   		alert(scShow)
   		return scShow
   
   	})
   	return zyb;
   }
   ```

2. 然后通过在 html 中使用 externalLibs。整个文件如下：

   ```html
   <html>
     <head>
       <script src="https://cdn.jsdelivr.net/gh/skulpt/skulpt-dist/skulpt.min.js" type="text/javascript"></script>
       <script src="https://cdn.jsdelivr.net/gh/skulpt/skulpt-dist/skulpt-stdlib.js" type="text/javascript"></script>
       <!-- <script src="./skulpt.min.js" type="text/javascript"></script> -->
       <!-- <script src="./skulpt-stdlib.js" type="text/javascript"></script> -->
     </head>
     <body>
       <h3>Try This</h3>
       <form>
         <textarea id="yourcode" cols="80" rows="10">
   import zyb
   print(zyb.add(1,2,3))
     </textarea
         ><br />
         <button type="button" onclick="runit()">Run</button>
       </form>
       <pre id="output"></pre>
       <div id="mycanvas"></div>
       <script>
         // 第三方模块列表 可导入多个文件
         var externalLibs = {
           // 确保模块路径能访问到，这里我用的是相对路径./zyb.js
           "./zyb/__init__.js": "./zyb.js", 
           // "./music/__init__.js": "./music.js",
         };
         function outf(text) {
           var mypre = document.getElementById("output");
           mypre.innerHTML = mypre.innerHTML + text;
         }
         function builtinRead(file) {
           console.log("Attempting file: " + Sk.ffi.remapToJs(file));
           console.log(externalLibs[file],'---')
           if (externalLibs[file] !== undefined) {
             return Sk.misceval.promiseToSuspension(
               fetch(externalLibs[file]).then(
                 function (resp){ return resp.text(); }
               ));
           }
   
           if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[file] === undefined) {
             throw "File not found: '" + file + "'";
           }
           
           return Sk.builtinFiles.files[file];
         }
         function runit() {
           console.log('------');
           var prog = document.getElementById("yourcode").value;
           var mypre = document.getElementById("output");
           console.log(prog.split('\n'),'=========', prog.includes('enter'));
           prog = [...new Set(prog.split('\n'))].join('\n')
   
           // if(prog.includes('enter')) {
           //     var btn=document.getElementById("btn");
           // 　　var modal=document.getElementById("modal");
           // 　　var close=document.getElementsByClassName("close");
           // 　　//点击按钮，弹出弹框
           // 　　modal.style.display="block";
           // }
   
           mypre.innerHTML = "";
           Sk.pre = "output";
           Sk.configure({
             output: outf,
             read: builtinRead,
             __future__: Sk.python3,
           });
   
           (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "mycanvas";
           var myPromise = Sk.misceval.asyncToPromise(function() {
             return Sk.importMainWithBody("<stdin>", false, prog, true);
           });
   
           myPromise.then(
             function(music) {
               console.log(music,"success");
             },
             function(err) {
               console.log(err.toString());
             }
           );
         }
       </script>
     </body>
   </html>
   ```

   注：如果需要请求接口 则可以通过 express 起一个本地服务，进行跨域方式的解决。（live-server 通过 proxy 代理的方式并没有本质上解决跨域问题）

   3. 使用 express 创建一个服务

      ```javascript
      ar express = require('express');
      // 引入node 中间件 express 起一个服务
      // sudo npm install express express-generate -g 首先全局安装 express，express --version 查看安装 express 的版本
      // 如果还是报错 express is undefined 的话，项目中 npm install express（package.json）通过 npm init 创建
      
      const { createProxyMiddleware } = require('http-proxy-middleware');
      // npm install http-proxy-middleware 用来代理 中间，配置一些 request、response 的请求代理
      
      // proxy middleware options 定义代理配置项
      const options = {
        target: 'https://www.shi-ci.com', // target host 代理目标的域名
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/api': '' // 注意这里，到时候调用接口的时候记得带上 /api
        },
        router: {
          // when request.headers.host == 'dev.localhost:3000',
          // override target 'http://www.example.org' to 'http://localhost:8000'
          'dev.localhost:3000': 'http://localhost:8000',
        },
      };
      
      // create the proxy (without context)
      const exampleProxy = createProxyMiddleware(options);
      // 生成代理
      
      var path = require('path')
      var app = express();
      
      app.use(express.static(path.join(__dirname, 'public')));
      app.use('/api', exampleProxy);
      // 使用代理
      
      app.use(express.static('static'))
      //设置跨域访问
      app.all('*', function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
          res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
          res.header("X-Powered-By",' 3.2.1')
          res.header("Content-Type", "application/json;charset=utf-8");
          next();
      });
      
      app.get('/index.html', function(req, res) {
          res.send({id:req.params.id, name: req.params.password});
      });
      
      app.listen(3000);
      console.log('Listening on port 3000...');
      ```

      **运行该 js 文件(node xx.js)，通过 `localhost:3000/example.html`访问页面**

