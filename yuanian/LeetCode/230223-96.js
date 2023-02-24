// 回溯 解法  该解法有问题。

var generateTrees = function(n) {
    const cb = (arr, index) => {
        if(arr.length === 0) return null;
        const root = new TreeNode(arr[index]);
        root.left = cb(arr.slice(0, index), index);
        root.right = cb(arr.slice(index + 1), index);
        return root
    }
    const array = [...new Array(10).keys()].map(item => item + 1);
    const res = []
    for(let i = 0; i < n; i++) {
        res.push(cb(array, i))
    }
    return res;
};