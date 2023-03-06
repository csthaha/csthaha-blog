/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const map = new Map();
    for(let num of nums) {
        if(!map.has(num)) {
            map.set(num, 1)
        } else {
            let count = map.get(num) + 1;
            map.set(num, count)
        }
    }
    const res = [];
    let values = [...map.values()].sort((a, b) => b - a);
    let keys =  [...map.keys()]
    console.log(map, keys, values);
    for(let i = 0; i < k; i++) {
        let key = keys.find(key => map.get(key) === values[i])
        res.push(key)
        map.delete(key)
    }
    return res
};
// console.log(
//     topKFrequent([1,1,1,2,2,3], 2)
// );
console.log(
    topKFrequent([1,2], 2)
);
