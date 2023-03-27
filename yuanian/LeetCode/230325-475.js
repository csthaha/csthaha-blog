/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function(houses, heaters) {
    if(heaters.length === 0) return;
    let indexList = heaters.map(item => item);
    let distance = [];
    if(indexList.length === 1) {
        return Math.max(
            indexList[0] - 1,
            houses[houses.length  -1] - indexList[0]
        )
    }
    for(let i = 0; i < indexList.length; i++) {
        let left = indexList[i] === 0 ? 0 : indexList[i] - 1 - (indexList[i - 1] || 0);
        let right = indexList[i] === houses.length - 1 ? 0 : (
            i === indexList.length - 1 ? houses.length - indexList[i] : (indexList[i + 1] - indexList[i] - 1)
        )
        distance.push(
            Math.max(i === 0 ? indexList[i] : left >> 1, i === indexList.length - 1 ? right : right >> 1)
        )

    }
    return distance.sort((a, b) => b - a)[0];
};

console.log(
    findRadius([1,2,3,4], [1, 4])
);
console.log(
    findRadius([1,2,3], [2])
);
console.log(
    findRadius([1,5], [2])
);