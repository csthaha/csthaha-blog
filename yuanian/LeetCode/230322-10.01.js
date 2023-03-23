var merge = function(A, m, B, n) {
    // let ans = [];

    // while(m && n) {
    //     let a = A[0];
    //     let b = B[0];
    //     if(a < b) {
    //         ans.push(A.shift())
    //         m--;
    //     } else {
    //         ans.push(B.shift())
    //         n--;
    //     }
    // }
    // return ans.concat(A.slice(0, m)).concat(B.slice(0, n))

    // 法儿
    A.splice(m, A.length - m, ...B);
    A.sort((a, b) => a - b);
    return A
};

console.log(
    merge(
        [1,2,3,0,0,0],
        3,
        [2,5,6],
        3
    )

);