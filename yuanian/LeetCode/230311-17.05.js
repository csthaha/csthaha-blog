/**
 * @param {string[]} array
 * @return {string[]}
 */
// var findLongestSubarray = function(array) {
//     // 判断是否是字母还是数字。 true str, false num
//     var jugeNum = str => isNaN(+str)

//     // 判断是否是字母、数组相等。
//     var equal = arr => {
//         let strCount = 0;
//         let numCount = 0;
//         for(let item of arr) {
//             if(jugeNum(item)) {
//                 strCount ++;
//             } else {
//                 numCount ++;
//             }
//         }
//         return strCount === numCount;
//     }
//     // 暴力求解 所有子数组；
//     const map = {};
//     // 进行更新 map
//     var updateMap = (i, list) => {
//         if(equal([...list])) {
//             // 如果满足条件
//             // 需要判断是否存在
//             if(map[i]) {
//                 if(map[i].length < [...list].length) {
//                     // 更新
//                     map[i] = [...list]
//                 }
//             } else {
//                 map[i] = [...list]
//             }
//         }
//     }
//     for(let i = 0; i < array.length; i++) {
//         let cur = [array[i]]
//         updateMap(i, cur)
//         for(let j = i + 1; j < array.length; j++) {
//             cur.push(array[j]);
//             updateMap(i, cur)
//         }
//     }
//     return Object.keys(map).reduce((a, b) => {
//         let val = a.length < map[b].length ? map[b] : a;
//         return val;
//     }, [])
    
// };

// 毫无疑问 超出时间限制。

// 利用前缀和 来解决问题。
// 前缀:数组中的前缀是指从左到右，长度小于或者等于数组长度的子数组；
// 前缀和：数组的前缀子数组的和；

// 可以将字母当作 -1 数字当作1

var findLongestSubarray = function (array) {
    let sum = 0,
        start = 0,
        end = 0;
    // start、end 记录最大结果的索引
    const map = new Map();
    map.set(0, -1);  // 0 的时候满足条件。 默认为 -1 对结果处理。

    // 判断是字母还是数字
    var jugeNum = str => isNaN(+str)

    for(let i = 0; i < array.length; i++) {
        // 前缀和思想
        sum += jugeNum(array[i]) ? -1 : 1;
        // 因为只有在 sum = 0 的时候才会存在不然要么 正越大 负越小
        if(map.has(sum)) {
            // 之前存过 sum
            // 判断是否需要更新。  就是 区间最大更新
            if(i - map.get(sum) > end - start) {
                end = i;
                start = map.get(sum)
            }
        } else {
            map.set(sum, i)
        }
    }
    return array.slice(start + 1, end + 1)
}

console.log(
    findLongestSubarray(["A","A"])
);
console.log(
    findLongestSubarray(["A","A", "1", "2"])
);
console.log(
    findLongestSubarray(["A","1","B","C","D","2","3","4","E","5","F","G","6","7","H","I","J","K","L","M"])
);



