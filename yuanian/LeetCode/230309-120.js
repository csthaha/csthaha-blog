/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    // 回溯找所有路径超时了。
    // const res = [];
    // const row = triangle.length;
    // const col = triangle[row - 1].length;

    // // 求出所有路径
    // const help = (path, l, r) => {
    //     if(l >= row || r >= col) return 
    //     path.push(triangle[l][r]);
    //     if(path.length === row) {
    //         res.push([...path]);
    //         return;
    //     }
    //     help(path, l + 1, r);
    //     path.pop();
    //     help(path, l + 1, r + 1)
    //     path.pop()
    // }
    // help([],0, 0)
    // return res.map(item =>  item.reduce((a, b) => a + b, 0)).sort((x, y) => x - y)[0];

    // 动态规划
};

console.log(
    minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]])
);
