function insertSort(arr) {
    for(let i = 1; i < arr.length; i++) {
        for(let j = i; j > 0; j--) {
            if(arr[j] < arr[j - 1]) {
                swap(arr, j, j - 1)
            }
        }
    }
    return arr;
}

function swap(arrray,i, j) {
    let temp;
    temp = arrray[i];
    arrray[i] = arrray[j];
    arrray[j] = temp;
    // return arrray;
}

console.log(insertSort([1,3,2]));