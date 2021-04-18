// // function unique2(arr) {
// //     let arr1 = [],
// //         arr2 = [];

// //     for(let i = 0; i < arr.length; i++) {
// //         if(!arr1.includes(arr[i])) {
// //             arr1.push(arr[i])
// //         } else {
// //             if(!arr2.includes(arr[i])) {
// //                 arr1.push(arr[i])
// //                 arr2.push(arr[i])
// //             } 
// //         }
// //     }

// //     return arr1;
// // }

// // console.log(unique2([1,2,3,1,1,1,2,4,5,6,3]))

// function uniqueMap(arr) {
//     let map = new Map()

//     for(let i = 0; i < arr.length; i++) {
        
//         if(map.get(arr[i])) {
//             let num = map.get(arr[i]) + 1
//             map.set(arr[i], num)
//             if(num > 2) {
//                 map.set(arr[i], 2)
//             }
//         }
//         if(!map.get(arr[i])) {
//             map.set(arr[i], 1)
//         }
//     }

//     return map

    
// }

// console.log(uniqueMap([1,2,3,1,1,1,2,4,5,6,3]))


// [1,2,3,1,2,3,2,2]



function dealArray(arg) {
    const map = new Map(), res = []
    for(let i =0 ;i < arg.length;i++)  {
        if(map.get(arg[i])) {
            map.set(arg[i],map.get(arg[i])+1)
            map.get(arg[i]) == 2 && res.push(arg[i])

        }else {
            map.set(arg[i],1)
            res.push(arg[i])
        }
    }
    return res
}

console.log(dealArray([1,2,3,1,2,3,2,2,5,6,5,5,5]))