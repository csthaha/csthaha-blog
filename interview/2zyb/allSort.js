/**
 * @param {string} s
 * @return {string[]}
 */

// 思路 回溯方法没错，但是得 剪枝 去 去重。

// 去重条件就是 visit[i]  || (nums[i] ==== nums[i - 1] && !visit[i - 1])
// 意思就是 i 访问了 则不继续，或者 只有 前面一个选择 后面一个才能选择。
// 所以 nums[i] ==== nums[i - 1] && !visit[i - 1] 啥也不干继续循环
 var permutation = function(s) {
    let res = []
    const vis = new Array(s.length).fill(false);
    const backTrack = (path, index) => {
        if(path.length === s.length) {
            res.push(path)
            return
        }

        for(let i = 0; i < s.length; i++) {
            if(vis[i] || (i > 0 && s[i] === s[i - 1] && !vis[i - 1])) continue
            path = path + s[i]
            vis[i] = true;
            backTrack(path.slice(), index + 1)
            path = path.slice(0, path.length - 1)
            vis[i] = false;
        }
    }

    backTrack('')
    return [...new Set(res)];
};

console.log(permutation("aab"))
console.log(permutation("121"))
console.log(permutation("abc"))