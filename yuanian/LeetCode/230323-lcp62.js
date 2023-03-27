/**
 * @param {number[][]} path
 * @return {number}
 */
var transportationHub = function(path) {
    // 这题 应该是 图。 就是说 入度 为 n - 1(n 为节点。)。出度为 0 的 点 
    const map = new Map();
    for(let item of path) {
        let a = item[0];
        let b = item[1];
        map.set(a, {
            out:  (map.get(a) || {out: 0, in: 0}).out + 1,
            in: (map.get(a) || {out: 0, in: 0}).in
        })
        map.set(
            b,
            {
                out: (map.get(b) || {out: 0, in: 0}).out,
                in: (map.get(b) || {out: 0, in: 0}).in + 1
            }
        )
    }
    let keys = [...map.keys()]
    console.log(keys, map, keys.length,keys.find(key => map.get(key).in + 1 === keys.length && map.get(key).out === 0));
    return keys.find(key => map.get(key).in + 1 === keys.length && map.get(key).out === 0) || -1;
};

// console.log(
//     transportationHub([[0,3],[1,0],[1,3],[2,0],[3,0],[3,2]])
// );
// console.log(
//     transportationHub([[0,1],[0,3],[1,3],[2,0],[2,3]])
// );
// console.log(
//     transportationHub([[2,5],[4,3],[2,3]])
// );
console.log(
    transportationHub([[1,0],[3,0],[2,0]])
);