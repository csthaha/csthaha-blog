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
    const backTrack = (path) => {
        if(path.length === s.length) {
            res.push(path)
            return
        }
        for(let i = 0; i < s.length; i++) {
            if(vis[i] || (i > 0 && s[i] === s[i - 1] && !vis[i - 1])) continue
            path = path + s[i]
            vis[i] = true;
            backTrack(path.slice())
            path = path.slice(0, path.length - 1)
            vis[i] = false;
        }
    }
    s = s.split('').sort().join('')
    backTrack('')
    return res
};

console.log(permutation("aab"))
console.log(permutation("121"))
console.log(permutation("abc"))


/** 40 。
 *
 * 直接回溯的话超出时间限制了。所以需要进行减枝
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const res = [];
    const visited = new Array(candidates.length).fill(false);
    const backTrack = (path, start) => {
      const total = path.reduce((a, b) => a + b, 0);
      if (total > target) return;
      if (total === target) {
        res.push(path.slice());
        return;
      }
  
      for (let i = start; i < candidates.length; i++) {
        if (
          visited[i] ||
          (i > start && candidates[i] === candidates[i - 1] && !visited[i - 1])
        ) {
          continue;
        }
        path.push(candidates[i]);
        visited[i] = true;
        backTrack(path, i + 1);
        path.pop();
        visited[i] = false;
      }
    };
    candidates.sort((x, y) => x - y);
    backTrack([], 0);
    return res;
  };
  
  console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
  console.log(combinationSum2([2, 5, 2, 1, 2], 5));
  