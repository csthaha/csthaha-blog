/**
 * @param {number[][]} points
 * @return {number}
 */
// var numberOfBoomerangs = function(points) {
//     const res = [];
//     const clcDistance = (p1, p2) => {
//         const x = Math.pow(p1[0] - p2[0], 2)
//         const y = Math.pow(p1[1] - p2[1], 2)
//         return Math.sqrt(x + y)
//     }
//     for(let i = 0; i < points.length; i++) {
//         for(let j = 0; j < points.length; j++) {
//             if(i === j) continue;
//             const d1 = clcDistance(points[i], points[j])
//             for(let k = 0; k < points.length; k++) {
//                 if(k === i || k === j) continue;
//                 const d2 = clcDistance(points[i], points[k])
//                 if(
//                     d1 === d2
//                 ) {
//                     res.push(
//                         [points[i], points[j], points[k]]
//                     )
//                 }
//             }
//         }
//     }
//     return res.length;
// };

var numberOfBoomerangs = function(points) {
    let ans = 0;
    for (const p of points) {
        const cnt = new Map();
        for (const q of points) {
            const dis = (p[0] - q[0]) * (p[0] - q[0]) + (p[1] - q[1]) * (p[1] - q[1]);
            cnt.set(dis, (cnt.get(dis) || 0) + 1);
        }
        for (const [_, m] of cnt.entries()) {
            ans += m * (m - 1);
        }
        console.log(cnt, cnt.entries());
    }
    return ans;
};

console.log(
    numberOfBoomerangs([[0,0],[1,0],[2,0]])
);
console.log(
    numberOfBoomerangs([[1,1],[2,2],[3,3]])
);
console.log(
    numberOfBoomerangs([[1,1]])
);