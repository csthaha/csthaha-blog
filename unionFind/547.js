const find = (parent, x) => {
    // if(x === parent[x]) return parent[x]
    // return find(parent[x])
    if (parent[x] !== x) {
        parent[x] = find(parent, parent[x]);
    }
    return parent[x];
}

const union = (parent, x, y) => {
    // let xParent = parent[x],
    //     yParent = parent[y]

    // if(xParent != yParent) {
    //     xParent = yParent
    // }
    parent[find(parent, x)] = find(parent, y);
}

var findCircleNum = function(isConnected) {
    const provinces = isConnected.length;
    const parent = new Array(provinces).fill(0)
    for(let i = 0; i < provinces; i++) {
        parent[i] = i;
    }
    
    for(let i = 0; i < provinces; i++) {
        for(let j = i + 1; j < provinces; j++) {
            //  n x n 的
            if(isConnected[i][j] == 1) {        // 如果两个省份直接相连，则统一到一个集合
                union(parent, i, j)
            }
        }
    }

    let circles = 0;
    for(let i = 0; i < provinces; i++) {
        if(parent[i] === i) {
            circles++;
        }
    }

    return circles;
}


// var findCircleNum = function(isConnected) {
//     const provinces = isConnected.length;
//     const parent = new Array(provinces).fill(0);
//     for (let i = 0; i < provinces; i++) {
//         parent[i] = i;
//     }
//     for (let i = 0; i < provinces; i++) {
//         for (let j = i + 1; j < provinces; j++) {
//             if (isConnected[i][j] == 1) {
//                 union(parent, i, j);
//             }
//         }
//     }
//     let circles = 0;
//     for (let i = 0; i < provinces; i++) {
//         if (parent[i] === i) {
//             circles++;
//         }
//     }
//     return circles;
// };

// const union = (parent, index1, index2) => {
//     parent[find(parent, index1)] = find(parent, index2);
// }

// const find = (parent, index) => {
//     if (parent[index] !== index) {
//         parent[index] = find(parent, parent[index]);
//     }
//     return parent[index];
// }

console.log(findCircleNum([[1,0,0], [0,1,0], [0,0,1]]))
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))