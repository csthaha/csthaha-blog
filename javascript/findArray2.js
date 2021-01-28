function find2max(arr) {
    // var arr = [...new Set(array)]
    if(arr.length < 2) return []
    let max = arr[0] > arr[1] ? arr[0] : arr[1],
        max2 = arr[0] > arr[1] ? arr[1] : arr[0]
    for(let i = 2; i < arr.length; i++) {
        let temp;
        if(arr[i] > max) {
            temp = max;
            max = arr[i]
            if(temp > max2) {
                max2 = temp;
            }
        } else if(arr[i] > max2){
            max2 = arr[i]
        }
    }

    return max2
}

console.log(find2max([1,9,8,11]));  // 9