1. uni-app 路由怎么做的（hash, history） => 区别

2. 项目登录怎么做的

3. 后台管理系统 导出数据 10w 调如何解决

3. 单点登录 a.com 登录之后 如何在 b.com 不用登录

4. const a = 1; a.func() 会怎么样 ？ 报错： 错误是啥
    a.toFixed(1) 呢
    不改动代码 如何让它 不报错? 除了 protoType 呢？

5. const c = 1;
   const obj = {
       c: 2,
       b: () => {
           console.log(this.c)
       }
       m() {
           console.log(this.c)
       }
   }

   obj.b(); obj.m()
   const m = obj.m
   m()
   不改动代码 怎么实现 m 输出的结果 为 1， 除了 obj.a 呢


6. 轮询如何做？ setTimeout

setTimeout 实现 setInterval （麻蛋，最后的最后忘记 递归调用自己去实现）