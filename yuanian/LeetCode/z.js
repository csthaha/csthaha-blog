/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function(nums) {
    const map = new Map();
    for(let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    let count = [...map.values()].sort((a, b) => b - a)[0];
    let num = [...map.keys()].filter(n => map.get(n) === count);
    
    let distance = num.map(item => {
        let startIndex = nums.indexOf(item);
        let endIndex = nums.lastIndexOf(item);
        return endIndex - startIndex + 1;
    })


    return distance.sort((a, b) => a - b)[0]
};

console.log(
    findShortestSubArray([1,2,2,3,1])
);
console.log(
    findShortestSubArray([1,2,2,3,1,4,2])
);