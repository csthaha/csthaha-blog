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


// 方法一
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


// 方法二：递归查找children
function transfer2(data, childrenRes, pId) {
    for(let i = 0; i < data.length; i++) {
        if(data[i].parentId === pId) {
            const newItem = {...data[i], children: []}
            childrenRes.push(newItem)
            transfer2(data, newItem.children, data[i].id)
        }
    }
}

const arrayToTree = (data, pid) => {
    const result = [];
    transfer2(data, result, pid)
    return result;
}
console.log(arrayToTree(data, null)[0]);

// 方法二-二
const geTree = (data, pId) => 
    data
        .filter(item => item.parentId === pId)
        .map(item => ({...item, children: geTree(data, item.id)}));

console.log(geTree(data, null)[0]);


// 方法三
function transferMap(items, pId) {
    const result = [];   // 存放结果集
    const itemMap = {};  // 
    for (const item of items) {
        const id = item.id;
        const pid = item.parentId;
        itemMap[id] = {
            ...item,
            children: itemMap[id] ? itemMap[id]['children'] : []
        }
        const treeItem =  itemMap[id];
        if (pid === pId) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}

console.log(transferMap(data, null)[0]);

// 性能： 三、一、二
// 三最好一次遍历