function quickSort(arr) {
    if(arr.length <= 1) return arr
    // if(arr.length === 0) return []  // 特别注意这两种情况，不然会进入死循环
    // if(arr.length === 1) return [arr[0]]
    
    var left = [],
        right = [],
        mid = Math.ceil(arr.length / 2)
    
    var midValue = arr.splice(mid, 1)[0];   // splice 返回删除元素的新数组，并且会改变原数组
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < midValue) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    // for(let i = 0; i < mid; i++) {
    //     if(arr[i] > arr[mid]) {
    //         right.push(arr[i])
    //     } else {
    //         left.push(arr[i])
    //     }
    // }
    // for(let i = mid + 1; i < arr.length; i++) {
    //     if(arr[i] > arr[mid]) {
    //         right.push(arr[i])
    //     } else {
    //         left.push(arr[i])
    //     }
    // }
    // return [...left]
    return quickSort(left).concat(midValue).concat(quickSort(right))
}

console.log(quickSort([-2,-7,8,1,3,9,6]));