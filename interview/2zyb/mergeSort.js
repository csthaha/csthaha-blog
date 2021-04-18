// 归并 排序

function mergeSort(arr) {
    if(arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    let left = arr.slice(0, mid),
        right = arr.slice(mid)

    return merge(mergeSort(left), mergeSort(right))
}

function merge(l, r) {
    let res = []
    while(l.length && r.length) {
        if(l[0] < r[0]) {
            res.push(l.shift())
        } else {
            res.push(r.shift())
        }
    }

    return res.concat(l).concat(r)
}
console.log(mergeSort([1,0,9,3,5]))