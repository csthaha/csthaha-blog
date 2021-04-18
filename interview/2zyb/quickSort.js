function quickSort(arr) {
    if(arr.length === 0) return []
    let mid = arr.splice(Math.floor(arr.length / 2), 1)[0],
        left = [],
        right = []

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > mid) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }

    return quickSort(left).concat(mid).concat(quickSort(right))
}

console.log(quickSort([3,1,5,0, 9]))   