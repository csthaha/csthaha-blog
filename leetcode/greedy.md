## 贪心
> leetcode解释 贪心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，他所做的是在某种意义上的局部最优解。
> 也是将一个大问题局部最优解，最后化成一个个小问题。

### 区间问题：
区间问题两个点：
- 排序。根据实际问题进行排序。区间起点排序，区间终点排序等。
- 贪心，将问题化为子问题。更新当前状态
[好文推荐](https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie/qu-jian-wen-ti-he-ji)


#### leetcode435：无重叠区间
<b style="color: #ea6f5a">思路: </b>如果 [a, b] 是第一个区间，那么 a 左侧是没有区间，然后就要考虑该区间的右侧，如果 区间 [c,d] ,c 小于 b 的话，那么我们判定这两个区间重叠了， 否则更新当前区间了，然后继续往下考虑是否有重叠区间。 由此可见：我们只需将数组按照区间的终点进行升序排序。（贪心：算出当前区间的终点最大值，然后替换区间）

```javascript
var eraseOverlapIntervals = function(intervals) {
    // 将区间进行终点升序排列
    intervals.sort((a, b) => a[1] - b[1])

    let ans = 1, interval = intervals[0]    // 第一个区间。（区间终点最小）
    for(let i = 1; i < intervals.length; i++) {
        if(interval[1] <= intervals[i][0]) {    // 区间 [c,d] 的 c >= 区间 [a, b] 的 b (没有重叠)
            ans++;
            interval = intervals[i]     // 更新状态，最新区间终点 ，继续往下走
        }
    }

    return intervals.length ? intervals.length - ans : 0
};
```

#### leetcode1288: 删除覆盖区间
<b style="color: #ea6f5a">思路: </b>仍然是先进行排序，怎么排序呢？？？ 因为是覆盖，比如 a,b,c,d  a > c, b < d. 区间 [c,d] 是覆盖 区间 [a,b] 所以我们需要按照 区间起点升序排序。为了更好找到覆盖区间，我们再进行区间终点降序排序。也就是说我们将 区间[c,d] 当做我们的起点和终点。可以更好的找到覆盖区间[a,b]。
分三种情况，覆盖，相交，完全不相交。

```javascript
var removeCoveredIntervals = function(intervals) {
    // 因为是覆盖问题，所以需要按照区间起点升序排序，如果，起点相等则终点降序。为的防止 a > c, b < d 区间[c,d] 覆盖 [a, b] 更容易找到覆盖区间
    intervals.sort((a, b) => {
        if(a[0] === b[0]) return b[1] - a[1]
        return a[0] - b[0]
    })
    // let ans = 0, left = intervals[0][0], right = intervals[0][1]   // 第一个区间
    let ans = 0, temp = intervals[0]   // 第一个区间
    for(let i = 1; i < intervals.length; i++) {
        if(intervals[i][0] >= temp[0] && intervals[i][1] <= temp[1]) {
            // 区间覆盖了
            ans++;
        }
        if(temp[1] <= intervals[i][1] &&  temp[1] >= intervals[i][0]) {
            // 区间相交 更新区间
            temp[1] = intervals[i][1]
        }
        if(intervals[i][0] > temp[1]) {
            // 完全不相交
            temp[0] = intervals[i][0] // 更新区间
            temp[1] = intervals[i][1]
        }
    }
    return intervals.length ? intervals.length - ans : 0
};
```

