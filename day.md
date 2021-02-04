## 1/7 (并查集)
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

## 1/8 (数组旋转)
- leetcode 189：

```javascript
// leetcode 189 旋转数组

// 法一： 可以解决问题，但不符合题目要求，原地反转（空间复杂度需要 O(1) ）
var rotate = function(nums, k) {
    var arr = new Array(nums.length).fill(0)
    for(let i = 0; i < nums.length; i++) {
        let temp = nums[i]
        if(i + k <= nums.length - 1) {
            arr[i + k] = temp;
        } else {
            arr[i + k - nums.leng89th] = temp
        }
    }
    return arr
};

const reverse = (nums, start, end) => {
    while (start < end) {
        const temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start += 1;
        end -= 1;
    }
}

var rotate = function(nums, k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
};
// 操作	                    结果
// 原始数组	                1 2 3 4 5 6 7
// 翻转所有元素	            7 6 5 4 3 2 1
// 翻转 [0, k\bmod n - 1][0,kmodn−1] 区间的元素	5 6 7 4 3 2 1
// 翻转 [k\bmod n, n - 1][kmodn,n−1] 区间的元素	5 6 7 1 2 3 4

console.log(rotate([-1,-100,3,99], 2))
console.log(rotate([1,2,3,4,5,6,7], 3))
```

## 1/8 (滑动窗口)
```javascript
function slideWindow(str) {
    let l = 0, r = 0;
    let reString = '', maxLength = 0;
    while(r < str.length && l <= r) {
        if(reString.indexOf(str[r]) > -1) {
            reString = reString.slice(1)
            l++;
        } else {
            maxLength = maxLength > (r - l + 1) ? maxLength : (r - l + 1);
            reString += str[r]
            r++;
        }
    }
    return maxLength
}

console.log(slideWindow('sfgf'));       // 3
console.log(slideWindow('sffag'));      // 3
console.log(slideWindow('aaaa'));       // 1
console.log(slideWindow('sffa'));       // 2
```

## 1/25 (promise 模拟接口请求队列)

### Promise
> promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值。
```javascript


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
```
```javascript
// 模拟网络请求队列

function multiRequest(urls, maxNum) {
    const ret = [];
    let i = 0;
    let resolve;
    const promise = new Promise(
        function(r) {
            return resolve = r
        }
    );
    const addTask = () => {
        if(i >= urls.length) {
            return resolve()
        }
        const task = request(urls[i++]).finally(() => {
            // console.log('两次')
            // addTask()
            addTask()
        })
        console.log('task is', task)
        ret.push(task)   
    } 
    while(i < maxNum) {
        // console.log('i is', i)
        addTask();
    }
 
    return promise.then(() => Promise.all(ret))
}
// 模拟请求
function request(url) {
    return new Promise(r => {
        const time = 1000;
        setTimeout(() => {
            console.log(url),
            r(url)
        }, time)
    })
}
multiRequest(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'], 2)
```

## 1/26 setInterval、setTimtout
### setTimeout
> setTimeout(callback, time) 第一个参数为回调函数，第二个参数是时间单位 ms 多久执行 callback
```javascript
let time = 1000
const callback= () => {
    console.log(`${time / 1000 } s 之后执行 callback `)
}
setTimeout(callback, time);
```

### setInterval
> setInterval(callback, time) 第一个参数为回调函数，第二个参数是时间单位 ms 多久执行 callback
> 区别在于：setInterval 会隔 time 时间之后重复执行
```javascript
setInterval(() => {
    console.log(`${time / 1000 } s 之后 setInterval 重复执行 callback `)
}, time);
```

### setTimeout 实现 setInterval
> setInterval 就是重复调用 setTimeout 递归调用
```javascript
const mySetInterval = (cb, time) => {
    const fn = () => {
        cb(); // 调用回调函数
        setTimeout(() => {
            fn()    // 递归调用自己
        }, time)
    }
    setTimeout(fn, time)
}
```

## 1/28 一次遍历找出数组中第二大的数
```javascript
function find2max(arr) {
    // var arr = [...new Set(array)]
    if(arr.length < 2) return []
    let max = arr[0] > arr[1] ? arr[0] : arr[1],
        max2 = arr[0] > arr[1] ? arr[1] : arr[0]
    for(let i = 2; i < arr.length; i++) {
        let temp;
        if(arr[i] > max) {
            temp = max;
            max = arr[i]
            if(temp > max2) {
                max2 = temp;
            }
        } else if(arr[i] > max2){
            max2 = arr[i]
        }
    }

    return max2
}

console.log(find2max([1,9,8,11]));  // 9
```

## [2/1 leetcode 888 分糖果](https://leetcode-cn.com/problems/fair-candy-swap/)
```javascript
/** leetcode 888 糖果交换
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var fairCandySwap = function(A, B) {
    let res = []
    let sA = A.reduce((a, b) => a + b, 0)
    let sB = B.reduce((a, b) => a + b, 0)
    let sAB = (sA + sB) / 2
    let diff = Math.abs(sA - sAB)
    for(let i = 0; i < A.length; i++) {
        for(let j = 0; j < B.length; j++) {
            if(Math.abs(A[i] - B[j]) === diff && (sA - A[i] + B[j]) === (sB - B[j] + A[i])) {
                res = [A[i], B[j]]
            }
        }
    }
    return res;
};

console.log(fairCandySwap([1,1],[2,2]));
```

## [2/4 leetcode 199 二叉树右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if(!root) return []
    let res = [],
        parent = [root],
        children = []
    while(parent.length > 0) {
        let len = parent.length
        while(len--) {
            let cur = parent.shift()
            cur.left && parent.push(cur.left)
            cur.right && parent.push(cur.right)
            if(len == 0) {
                res.push(cur.val)
            }
        }
        // let cur = parent.shift();
        // cur.left && children.push(cur.left)
        // cur.right && children.push(cur.right)
        // if(parent.length === 0) {
        //     res.push(cur.val)
        //     parent = children
        //     children = []
        // }
    }
    return res

};
```

## [2/4 leetcode 643 子数组最大平均数](https://leetcode-cn.com/problems/maximum-average-subarray-i/)
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
    let i = 1, sum = 0, res = 0;
    for(let m = 0; m < k; m++) {
        sum += nums[m]
    }
    // while (i <= nums.length - k) {
        
    //     for (let j = i; j <= i + k - 1 ; j++) {
    //         sum += nums[j]
    //     }

    //     if(sum > res) {
            
    //         res = sum
    //     }
    //     i++
    //     sum = 0
    // }

    // 滑动窗口
    res = sum
    console.log(sum, res)
    for(let j = k; j < nums.length; j++) {
        sum = sum - nums[j - k] + nums[j];
        res = Math.max(res, sum)
    }
    return res / k
};

console.log(findMaxAverage([1,12,-5,-6,50,3], 4))
// console.log(findMaxAverage([-1], 1))
```