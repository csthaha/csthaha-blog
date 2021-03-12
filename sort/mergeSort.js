/**
 * 归并排序
 */

 function mergeSort(arr) {
    if(arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2),
        left = arr.slice(0, mid), // 不改变原数组，返回新数组，不包含 end
        right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right))
 }

 function merge(left, right) {
    var res = [];
    while(left.length && right.length) {
        // 将有序的子序列合并成有序数组
        if(left[0] > right[0]) {
            res.push(right.shift())
        } else {
            res.push(left.shift())
        }
    }
    console.log(left, right)
    return res.concat(left).concat(right)   // 拼接剩余的 left 或 right（left，right 必有一个为空）
 }
 console.log(merge([1,3],[2,5]));
 console.log(mergeSort([1,3,2,7]));