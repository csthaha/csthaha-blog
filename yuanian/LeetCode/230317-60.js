/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    const res = [];
    const list = [];
    for(let i = 1; i <= n; i++) {
        list.push(i)
    }
    const backTrack = (path) => {
        if(path.length === n) {
            res.push([...path])
            return;
        }

        for(let i = 0; i < n; i++) {
            if(path.indexOf(list[i]) === -1) {
                path.push(list[i]);
                backTrack(path);
                path.pop()
            }
        }
    }
    backTrack([])
    console.log(res);
    return res[k - 1].join('');
};

console.log(
    getPermutation(3, 3)
);
console.log(
    getPermutation(4, 3)
);