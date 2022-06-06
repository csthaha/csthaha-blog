// const exampleObj= {
//     a: {
//         b: 'hello',
//         c: {
//             d: 'word',
//             m: {
//                 n: 'deep3',
//                 t: {
//                     y: 'dee4'
//                 }
//             }
//         }
//     },
//     e: 'hello word'
// }

// // 转换为
// // {
// //     'a.b': 'hello',
// //     'a.c.d': 'world',
// //     'e': 'hello wolrd'
// // }

// // 修改object key 值
// function handleV(obj, addKey) {
//     const newObj = {}
//     Object.keys(obj).forEach(k => newObj[`${addKey}.${k}`] = obj[k]);
//     return newObj
// }

// function transferObj(expObj) {
//     const result = {}
//     const loop = obj => {
//         const keys = Object.keys(obj)
//         keys.forEach(key => {
//             if(typeof obj[key] === 'object' && obj[key] !== null) {
//                 const handleObj = handleV(obj[key], key)
//                 loop(handleObj)
//             } else {
//                 result[key] = obj[key]
//             }
//         })
//     }
//     loop(expObj)
//     return result
// }

// console.log(transferObj(exampleObj));
// console.log(transferObj({}));
// console.log(transferObj({a: null, b: undefined, c: {d: 1}}));


function flatObj (obj) {
    const res = {};
    function keyToStr(keyStr, value, valueStr) {
        if (typeof value !== 'object' || value === null) {
            res[keyStr.slice(1)] = valueStr;
            return;
        }
        Object.keys(value).forEach((ele) => {
            if (typeof value[ele] === 'string') {
                valueStr = valueStr + value[ele]
            }
            keyToStr(keyStr + '.' + ele, value[ele], valueStr)
        })
    };
    keyToStr('', obj, '');
    return res;
}

console.log(flatObj({
    a: '1',
    b: {c: '2'}
}));