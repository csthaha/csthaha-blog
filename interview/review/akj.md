1. useState 在react 是同步还是异步

useState 在 react 中是异步的），因为 react 中的 useState 数据是批量更新的，也就是说当一个数据改变并不会立马渲染，
而是等好几个一起数据更新。（异步操作是为了提高性能，将多个状态合并一起更新，减少 re-render 调用）。

通过 addEventListener 添加的事件处理函数，还有通过 setTimeout / setInterval 是同步（即可以拿到结果）

2. b端是如何做权限管理的

[登录权限](https://juejin.cn/post/6844903478880370701)

1）登录：当用户填写完账号、密码后向服务端验证是否正确，验证通过之后，服务端会返回一个 token，拿到 token 之后（我会将这个 token 存贮到 cookie 中，保证刷新页面后能记住用户登录状态），前端会根据 token 再去拉取一个 user_info 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

2） 权限验证：通过 token 获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 router.addRouters 动态挂载这些路由。

这些数据和操作都是通过 vuex 全局管理控制的。（补充说明：刷新页面后 vuex 的内容也会丢失，所以需要重复上述的那些操作）

3. 数组去重 两个以上保留保留两个（遍历一次）

```javascript
function dealArray(arg) {
    const map = new Map(), res = []
    for(let i =0 ;i < arg.length;i++)  {
        if(map.get(arg[i])) {
            map.set(arg[i],map.get(arg[i])+1)
            map.get(arg[i]) == 2 && res.push(arg[i])

        }else {
            map.set(arg[i],1)
            res.push(arg[i])
        }
    }
    return res
}

console.log(dealArray([1,2,3,1,2,3,2,2,5,6,5,5,5]))
// [1, 2, 3, 1, 2, 3, 5, 6, 5]
```