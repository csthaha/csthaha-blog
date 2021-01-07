## 并查集
 主要是用于城市间道路，朋友圈问题。[例题](http://acm.hdu.edu.cn/showproblem.php?pid=1232)，leetcode 的省份数量，朋友圈问题.

解释：
>wiki中如下说明：并查集是一种树型的数据结构，用于处理一些不交集的合并及查询问题。有一个联合-查找算法（union-find algorithm）定义了两个用于此数据结构的操作：
> - Find: 确定元素属于哪一个子集。它可以被用来确定两个元素是否属于同一个子集。
> - Union: 将两个子集合并成同一个集合。

好文推荐：[并查集](https://blog.csdn.net/liujian20150808/article/details/50848646) [朋友圈](https://segmentfault.com/a/1190000020381349)

框架：
```javascript
//find: 查找自己的上级，自己的上级是自己则返回，否则找到为止。（确定自己属于哪个子集）
function find(x) {
    if(parent[x] === x) return x;
    return find(parent[x])  // 利用递归查找
}
// 写法二
function find2(x) {
    while(x != parent[x]) {
        x = parent[x]
    }
    return x;
}

// union: 合并两个子集，即安排 x 的上级， y 的上级 相等属于同一个集合
function union(x, y) {
    let xParent = parent[x],
        yParent = parent[y]

    if(xParent != yParent) {
        xParent = yParent
    }
}
```

leetcode 547 省份数量
```javascript
const find = (parent, x) => {
    // if(x === parent[x]) return parent[x]
    // return find(parent[x])
    if (parent[x] !== x) {
        parent[x] = find(parent, parent[x]);
    }
    return parent[x];
}

const union = (parent, x, y) => {
    // let xParent = parent[x],
    //     yParent = parent[y]

    // if(xParent != yParent) {
    //     xParent = yParent
    // }
    parent[find(parent, x)] = find(parent, y);
}

var findCircleNum = function(isConnected) {
    const provinces = isConnected.length;
    const parent = new Array(provinces).fill(0)
    for(let i = 0; i < provinces; i++) {
        parent[i] = i;
    }
    
    for(let i = 0; i < provinces; i++) {
        for(let j = i + 1; j < provinces; j++) {
            //  n x n 的
            if(isConnected[i][j] == 1) {        // 如果两个省份直接相连，则统一到一个集合
                union(parent, i, j)
            }
        }
    }

    let circles = 0;
    for(let i = 0; i < provinces; i++) {
        if(parent[i] === i) {
            circles++;
        }
    }

    return circles;
}


console.log(findCircleNum([[1,0,0], [0,1,0], [0,0,1]])) // 3
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))   // 2
```
