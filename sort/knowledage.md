### sort杂七杂八汇总

#### splice（index, howmany, item1,......,itemX）

1. index: 必需。整数，规定添加/删除元素的位置。使用负数可从数组结尾处规定位置。
2. howmany：必需。 要删除的元素的数量。如果设置为 0，则不会删除项目。
3. item1...: 可选。向数组添加的新项目。
- **如果是删除元素，则该方法返回的是删除的元素的新数组。**
- **如果是添加替换元素，返回的是替换元素的新数组。**
- **如果是添加元素则返回的是空数组。因此都会改变原数组。**
```javascript
// 删除元素 第二个参数不为 0
var array1 = [1,3,5]
array1.splice(1, 1)  // 返回所删除的新的数组 [3]
array1 // [1,5] // 改变原数组
// 替换元素 第二个参数不为 0，且传第三个参数
var array2 = [8,9,0]
array2.splice(1,2,8, 9) // 返回删除的两个元素的新数组，从索引 1 开始   [9,0]
array2 // [8,8,9]
// 添加元素, 第二个参数为 0
var array3 = [1,1,1]
array3.splcie(1, 0, 2,2,2)  // 添加元素 返回空数组 []
array3 // [1,2,2,2,1,1]
```

#### slice(begin[, end])
1. begin: 可选。默认值 0，从该索引处开始提取原数组元素。如果该参数为负数，则从数组的倒数第 n 个开始。如果超出数组的范围，则返回空数组。
2. end: 结束处的索引值，但不包含。如果该参数为负数，则表示在原数组中的倒数第几个元素结束抽取。
**返回值为新数组，但不会改变原数组**
```javascript
// 哪种都不会改变原数组。
// 参数为空，相当于复制数组
var array1 = [1,2,4];
array1.slice(); // [1,2,4]
// 含一个参数
var array2 = [3,4,5];
array2.slice(1) // 返回从索引 1 开始的新数组 [4, 5]
array2 // [3,4,5]
// 两个参数
var array3 = [1,7,8];
array3.slice(-2, -1) // [7] 注意不包含 end
array3 // [1,7,8]
```