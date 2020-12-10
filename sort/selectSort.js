// function selectSort(array) {
//     var res = [],
//         arr = array;
//     while(arr.length > 0) {
//         var min = chooseMin(arr),
//             index = arr.indexOf(min);
//         res.push(min)
//         arr.splice(index, 1)
//     }
//     return res
// }

// function chooseMin(arr) {
//     if(!Array.isArray(arr)) return
//     let min = arr[0];
//     for(let i = 1; i < arr.length; i++) {
//         min > arr[i] ? min = arr[i] : min = min;
//     }
//     return min;
// }

// console.log(selectSort([1,3,5,-1,0]));

function selectSort2(arr) {
    var len = arr.length,
        minIndex, temp;
    for(let i = 0; i < len - 1; i++){
        minIndex = i;
        for(let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

console.log(selectSort2([1,3,5,-1,0]));