// /** 1200
//  * @param {number[]} arr
//  * @return {number[][]}
//  */
//  var minimumAbsDifference = function(arr) {
//     const map = {};
//     arr.sort((a, b) => a - b)
//     for(let i = 1; i < arr.length; i++) {
//         const key = arr[i] - arr[i - 1];
//         if(map[key]) {
//             map[key].push([arr[i - 1], arr[i]])
//         } else {
//             map[key] = [[arr[i - 1], arr[i]]]
//         }
//     }
//     return map[
//         Object.keys(map).sort((a , b) => a - b)[0]
//     ]
// };

// console.log(
//     minimumAbsDifference([4,2,1,3])
// );
// console.log(
//     minimumAbsDifference([1,3,6,10,15])
// );
// console.log(
//     minimumAbsDifference([3,8,-10,23,19,-4,-14,27])
// );

// /** 1608
//  * @param {number[]} nums
//  * @return {number}
//  */
//  var specialArray = function(nums) {
//     const map = {};
//     for(let i = 1; i <= nums.length; i++) {
//         map[i] = nums.filter(item => item >= i).length
//     }
//     console.log(map);

//     const res = Object.keys(map).filter(k => +k === map[k])

//     return res.length === 0 ? -1 : res[0]
// };

// console.log(
//     specialArray([3,5])
// );
// console.log(
//     specialArray([0,4,3,0,4])
// );

// /** LCS 02
//  * @param {number[]} questions
//  * @return {number}
//  */
//  var halfQuestions = function(questions) {
//     const map = {}
//     for(let q of questions) {
//         if(map[q]) {
//             map[q] += 1;
//         } else {
//             map[q] = 1;
//         }
//     }

//     let arr = Object.values(map).sort((a, b) => b - a);
//     let res = 1;
//     let remainStu = questions.length / 2 - arr[0];
//     if(remainStu <= 0) {
//         return res;
//     }
//     for(let i = 1; i < arr.length; i++) {
//         if(remainStu <= arr[i]) {
//             res += 1;
//             break;
//         } else {
//             res += 1;
//             remainStu -= arr[i]
//         }
//     }

//     return res;
// };

// console.log(
//     halfQuestions([1,5,1,3,4,5,2,5,3,3,8,6])
// );




/** 1385
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
 var findTheDistanceValue = function(arr1, arr2, d) {
    arr2.sort((a, b) => a - b)
    let res = 0;
    for(let item of arr1) {
        for(let i = 0; i < arr2.length; i++) {
            if(Math.abs(item - arr2[i]) > d) {
                if(i === arr2.length - 1) {
                    res += 1;
                }
            } else {
                break;
            }
        }
    }

    return res;
};

console.log(
    findTheDistanceValue([4,5,8], [10,9,1,8], 2)
);
console.log(
    findTheDistanceValue([1,4,2,3], [-4,-3,6,10,20,30], 3)
);
console.log(
    findTheDistanceValue([2,1,100,3], [-5,-2,10,-3,7], 6)
);