/**
 * 给树形数据添加一些属性。
 * @param {Array} data 树形数据 
 * @param {Object} mapKey 映射的 key
 */

// function addAttrToTree(data, mapKey) {
//     const loop = arr => {
//         arr.forEach(item => {
//             Object.keys(mapKey).forEach(key => {
//                 item[key] = item[mapKey[key]]
//             })
//             if(item.chidlren && item.chidlren.length) {
//                 loop(item.chidlren)
//             }
//         });
//     }
//     loop(data)
// }

function addAttrToTree(data, mapKey) {
    const cloneData = [...data]
    while(cloneData.length) {
        const curItem = cloneData.shift();
        Object.keys(mapKey).forEach(key => {
            curItem[key] = curItem[mapKey[key]]
        })
        if(curItem.chidlren && curItem.chidlren.length) {
            cloneData.push(...curItem.chidlren)
        }
    }
    return data
}


const data = [
    {
        id: '001',
        name: 'chenst',
        age: 24,
        chidlren: [
            {
                id: '0010',
                name: 'haha',
                age: 0
            }
        ]
    },
    {
        id: '002',
        name: 'fh',
        age: 25
    }
]
const mapKey = {
    key: 'id',
    familyName: 'name',
    copyAge: 'age'
}
addAttrToTree(data, mapKey)
// console.log(addAttrToTree(data, mapKey));