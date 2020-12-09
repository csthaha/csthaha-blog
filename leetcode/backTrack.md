### leetcode - 回溯算法
> 思想：从问题的某一种状态(初始状态)出发, 搜索从这种状态出发所能达到的所有状态，当 一条路走到“尽头”的时候（不能再前进），再后退一步或者若干步。从另一种可能状态出发，继续探索 直到所有的路径都探索过了。这种不断前进，不断回溯寻找解的方法，就称为回溯。

> 解决一个回溯问题，实际上就是一个决策树的遍历过程。 只需要考虑三个问题：
- 路径：也就是已经做出的选择。
- 选择列表：也就是你当前可以做的选择。
- 结束条件：也就是到达决策树底层，无法再做选择的条件。

套用[labuladong的算法小抄](https://labuladong.gitbook.io/algo/suan-fa-si-wei-xi-lie/3.1-hui-su-suan-fa-dfs-suan-fa-pian/hui-su-suan-fa-xiang-jie-xiu-ding-ban)大哥的框架

**核心就是 for 循环里面的递归，在递归调用之前 做选择，在递归调用之后撤销选择，换一种路径。**

#### leetcode 46: 全排列
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    var res = [];
    
    var backTrack = (path) => {
        if(path.length === nums.length) {
            res.push(path)
            return
        }

        for(let i = 0; i < nums.length; i++) {
            if(!path.includes(nums[i])) {
                path.push(nums[i])
                backTrack(path.concat())
                path.pop()
            }
        }
    }
    backTrack([])
    return res;
};
```