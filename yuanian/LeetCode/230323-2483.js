/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function(customers) {
    // let ans = 0;
    // let cost = customers.length;

    // for(let i = 0; i <= customers.length; i++) {
    //     let curCost = 0
    //     let pre = customers.slice(0, i);
    //     let arr = customers.slice(i);
    //     for(let item of pre) {
    //         curCost = curCost +  ( item === 'N' ? 1 : 0);
    //     }
    //     for(let item of arr) {
    //         curCost = curCost + ( item === 'Y' ? 1 : 0);
    //     }
    //     if(cost > curCost) {
    //         cost = curCost;
    //         ans = i;
    //     }
    // }
    // return ans;

    let ans = 0;
    let cost = customers.split('').filter(item => item === 'Y').length;
    let minCost = cost;
    let Y = 0;
    let N = 0
    for(let i = 0; i < customers.length; i++) {
        if(customers[i] === 'Y') {
            Y++
        }
        if(customers[i] === 'N') {
            N++;
        }
        let curCost = cost - Y + N;
        if(minCost > curCost) {
            ans = i + 1;
            minCost = curCost;
        }
    }
    return ans;
};

console.log(
    bestClosingTime("YYNY")
);
console.log(
    bestClosingTime("NNNNN")
);
console.log(
    bestClosingTime("YYYY")
);