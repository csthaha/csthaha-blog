### 排序算法
> 各排序的时间空间复杂度：
![各各排序的时间空间复杂度：](https://user-gold-cdn.xitu.io/2016/11/29/4abde1748817d7f35f2bf8b6a058aa40?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 冒泡排序
> 核心：双重循环，每次循环相邻两个之间比较，如果当前元素比下一个元素大，则进行交换(从小到大排序)。
时间复杂度 O(n2), 空间复杂度 O(1), 最好情况就是排好序的数组 O(n), 相对来讲比较稳定。
**code如下：**
```javascript
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
```

#### 选择排序
> 核心：找出数组中最值元素，存放在数组的起始位置，然后继续该操作，直到排好序。就好比您过年打着扑克牌，永远是先从小的打起。
**cod如下：**
```javascript
// 法一：
function selectSort(array) {
    var res = [],
        arr = array;
    while(arr.length > 0) {
        // 当数组元素还有时，重复以下操作
        var min = chooseMin(arr),   // 找到最小值
            index = arr.indexOf(min);   // 找到索引
        res.push(min)   
        arr.splice(index, 1)        // 删除最小值 返回新数组
    }
    return res
}
// 找出数组中最小的值。
function chooseMin(arr) {
    if(!Array.isArray(arr)) return
    let min = arr[0];
    for(let i = 1; i < arr.length; i++) {
        min > arr[i] ? min = arr[i] : min = min;
    }
    return min;
}

console.log(selectSort([1,3,5,-1,0]));
```
```javascript
// 法二
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
```

#### 快速排序
> 核心：取其中一个数字，比该数字小的放左边，大的放右边。最后返回 递归 left 数组， 中间值，递归 right 数组的连接
**code如下：**
```javascript
// 法一：
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
    return quickSort(left).concat(midValue).concat(quickSort(right))
}

console.log(quickSort([-2,-7,8,1,3,9,6]));
```
