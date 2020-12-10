function bubbleSort(array) {
    for(let i = 0; i < array.length; i++) {
        // 外层 循环 array.length 趟;
        for(let j = 0; j < array.length - i -1; j++) {
            // 内层 循环 arrray.length - i - 1 趟; 
            let temp;
            if(array[j] > array[j + 1]) {
                // 进行交换
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp 
            }
        }
    }
    return array
}

console.log(bubbleSort([9,4,5,2,3,7,8,0]))
//[0,2,3,4,5,7,8,9]