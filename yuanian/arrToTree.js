// 数组转成树

const data = [
    
    { id: 74, parentId: null },  // 1
    { id: 62, parentId: 74 },    // 2
    { id: 56, parentId: 62 },   
    { id: 63, parentId: 62 },
    { id: 86, parentId: 74 },
    { id: 80, parentId: 86 },
    { id: 81, parentId: 80 },
    { id: 76, parentId: 80 },
    { id: 87, parentId: 86 },
    
];

// const idMapping = data.reduce((acc, el, i) => {
//     acc[el.id] = i;
//     return acc;
// }, {});
// let root;
// data.forEach(el => {
//   // 根节点
//   if (el.parentId === null) {
//     root = el;
//     return;
//   }
//   // 父节点
//   const parentEl = data[idMapping[el.parentId]];
//   // 子节点
//   parentEl.children = [...(parentEl.children || []), el];

// });
// console.log(root);


function arrToTree(arr) {
    if (!Array.isArray(arr)) return;
    const iteMapIndex = {}
    for(let i = 0; i < arr.length; i++) {
        // 存索引
        // iteMapIndex[arr[i].id] = i;
        iteMapIndex[arr[i].id] = arr[i]
    }
    let root = null;
    // console.log(iteMapIndex);
    arr.forEach(item => {
        if(item.parentId === null) {
            root = item;
            return;
        }
        // 父节点
        // const parentEl = data[iteMapIndex[item.parentId]];
        const parentEl = iteMapIndex[item.parentId];
        // 将 自己 push 到父节点的children中
        if(!parentEl.children) {
            parentEl.children = [];
        }
        parentEl.children.push(item)
    })
    return root

}
console.log(arrToTree(data));