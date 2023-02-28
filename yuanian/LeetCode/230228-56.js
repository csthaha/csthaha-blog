/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [];
    let freArr = intervals[0];
    for(let i = 1; i < intervals.length; i++) {
        if(freArr[0] <= intervals[i][0] &&  freArr[1] >= intervals[i][1]) {
            continue;
        }
        if(freArr[0] <= intervals[i][0] && freArr[1] <= intervals[i][1] && freArr[1] >= intervals[i][0]) {
            // 更新区间。
            freArr = [freArr[0], intervals[i][1]];
            continue;
        }
        if(freArr[1] < intervals[i][0]) {
            // 满足条件
            res.push(freArr);
            // 更新新区间
            freArr = intervals[i]
        }
    }
    res.push(freArr)
    return res;
};
// @lc code=end



console.log(
    merge([[1,3],[2,6],[8,10],[15,18]])
);


console.log(
    merge([[1,4],[4,5]])
);