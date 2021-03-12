// 将一个数组 乱序 排序

var array = [1,2,3,4,5,6,7,8]
// 1. 使用 sort

// function outOrder1(arr) {
//     return arr.sort((a, b) => Math.random() - 0.5)
// }

// console.log(outOrder1(array))

// 2. for循环随机选取

// function outOrder2(arr) {
//     var arrCopy = [...arr]
//         len = arrCopy.length
//         res = []
//     for(let i = 0; i < len; i++) {
//         index = Math.floor(Math.random() * arr.length)
//         res = res.concat(arr.splice(index, 1))
//     }
//     return res
// }

// console.log(outOrder2(array))

// 3. 洗牌算法
// 是指随机选取一个然后按顺序进行交换

function outOrder3(arr) {
    for(let i = 0; i < arr.length; i++) {
        var temp
            index = Math.floor(Math.random() * arr.length)
        temp = arr[index]
        arr[index] = arr[i]
        arr[i] = temp
    }
    return arr
}

console.log(outOrder3(array))