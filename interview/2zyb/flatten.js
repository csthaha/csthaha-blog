// // 数组扁平化

// function flatten(arr) {
//     if(arr.length === 0) return arr
//     return arr.reduce((pre, next) =>  Array.isArray(next) ? pre.concat(flatten(next)) : pre.concat(next),[])
// }

// console.log(flatten([1,[3],2,[1,[2]]]));

function flatten2(arr) {
    if(arr.length === 0) return arr
    let res = [];
    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            res = res.concat(flatten2(arr[i]))
        } else {
            res.push(arr[i])
        }
    }

    return res;
}

console.log(flatten2([1,[3],2,[1,[2]]]));