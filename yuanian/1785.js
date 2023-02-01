/**
 * @param {number[]} nums
 * @param {number} limit
 * @param {number} goal
 * @return {number}
 */
var minElements = function(nums, limit, goal) {
    // const arr = [...nums]
    // const getArr = (n, l, g) => {
    //     let total = n.reduce((a, b) => a + b, 0)
    //     let diff = g - total;
    //     if(diff === 0) return 0;
    //     const s = Math.abs(diff) > l ? l : Math.abs(diff)
    //     arr.push( diff > 0 ? s : -s )
    //     return getArr(arr, limit, goal)
    // }
    // getArr(nums, limit, goal)
    // return arr.length - nums.length

    const total = nums.reduce((a, b) => a + b, 0)
    const diff = goal - total;
    return Math.abs(Math.floor((diff + limit - 1) / limit));
};

const nums = [1,-10,9,1],
      limit = 100,
      goal = 0

// console.log(minElements([1,-1,1], 3, -4));
console.log(minElements([2,2,2,5,1,-2], 5, 910));
// console.log(minElements(nums, limit, goal));