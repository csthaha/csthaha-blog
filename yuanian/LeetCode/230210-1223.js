// 有一个骰子模拟器会每次投掷的时候生成一个 1 到 6 的随机数。

// 不过我们在使用它时有个约束，就是使得投掷骰子时，连续 掷出数字 i 的次数不能超过 rollMax[i]（i 从 1 开始编号）。

// 现在，给你一个整数数组 rollMax 和一个整数 n，请你来计算掷 n 次骰子可得到的不同点数序列的数量。

// 假如两个序列中至少存在一个元素不同，就认为这两个序列是不同的。由于答案可能很大，
// 所以请返回 模 10^9 + 7 之后的结果。

// 输入：n = 2, rollMax = [1,1,2,2,2,3]
// 输出：34
// 解释：我们掷 2 次骰子，如果没有约束的话，共有 6 * 6 = 36 种可能的组合。
// 但是根据 rollMax 数组，数字 1 和 2 最多连续出现一次，所以不会出现序列 (1,1) 和 (2,2)。
// 因此，最终答案是 36-2 = 34。

// 输入：n = 2, rollMax = [1,1,1,1,1,1]
// 输出：30 = 6 * 6 - 6

// 输入：n = 3, rollMax = [1,1,1,2,2,3]


// 1: （1，1，x）、（x，1，1）
// 2: （2，2，x）、（x，2，2）
// 3:  (3，3，x)、（x，3，3）
// 4:  （4，4，4）
// 5: （5，5，5）

// 输出：181 
// 216 - 6 * 6 + 3 - 2 
// 

/**
 * @param {number} n
 * @param {number[]} rollMax
 * @return {number}
 */
var dieSimulator = function(n, rollMax) {
    const dice = [1,2,3,4,5,6]
    let res = []
    function help (target, dice) {
        if(target.length > n) return
        if(target.length === n) {
            res.push(target)
            return;
        };
        // for(let i = 1; i <= 6; i++) {
        for(let i of dice) {
            target += i
            help(target.slice(0, target.length), dice)
            target = target.slice()
        }
    }

    function continuous(list, num, count) {
        const indexList = list.map((item, index) => {
            if(item === num) {
                return index
            } else {
                return ';'
            }
        })
        const x = indexList.join('').split(';')
        const maxLen = x.length === 1 ? x.join('').length : x.reduce((a, b) => a.length - b.length > 0 ? a.length : b.length)
        return maxLen <= count
    }

    help('', dice)
    for(let i = 1; i <= 6; i++) {
        res = res.filter(item => continuous(item, i, rollMax[i - 1]))
    }
    console.log(res);
    return res.length
};

// console.log(
//     dieSimulator(2, [1,1,2,2,2,3])
// );

// console.log(
//     dieSimulator(2, [1,1,1,1,1,1])
// );
// console.log(
//     dieSimulator(3, [1,1,1,2,2,3])
// );

console.log(
    dieSimulator(4, [1,1,1,1,1,1])
);
console.log(
    dieSimulator(3, [1,1,1,1,1,1])
);
console.log(
    dieSimulator(2, [1,1,1,1,1,1])
);
console.log(
    dieSimulator(1, [1,1,1,1,1,1])
);

// const MOD = 1000000007;
// var dieSimulator = function(n, rollMax) {
//     const d = new Array(n + 1).fill(0).map(() => new Array(6).fill(0).map(() => new Array(16).fill(0)));
//     for (let j = 0; j < 6; j++) {
//         d[1][j][1] = 1;
//     }
//     for (let i = 2; i <= n; i++) {
//         for (let j = 0; j < 6; j++) {
//             for (let k = 1; k <= rollMax[j]; k++) {
//                 for (let p = 0; p < 6; p++) {
//                     if (p !== j) {
//                         d[i][p][1] = (d[i][p][1] + d[i - 1][j][k]) % MOD;
//                     } else if (k + 1 <= rollMax[j]) {
//                         d[i][p][k + 1] = (d[i][p][k + 1] + d[i - 1][j][k]) % MOD;
//                     }
//                 }
//             }
//         }
//     }

//     let res = 0;
//     for (let j = 0; j < 6; j++) {
//         for (let k = 1; k <= rollMax[j]; k++) {
//             res = (res + d[n][j][k]) % MOD;
//         }
//     }
//     return res;
// };

// console.log(
//     dieSimulator(2, [1,1,1,1,1,1])
// );