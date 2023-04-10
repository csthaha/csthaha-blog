/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    // 固定长度滑动窗口
    // 超出时间 应该需要优化 对比
    // const ans = [];
    // let sortP = p.split('').sort().join('');
    // let slow = 0;
    // for(let i = 0; i < s.length; i++) {
    //     if(i < p.length -1) continue;
    //     let str = s.slice(slow, i + 1)
    //     if(str.split('').sort().join('') === sortP) {
    //         ans.push(slow);
    //     }
    //     slow++;
    // }
    // return ans;

    // 还是超出时间
    // const map = new Map;
    // // 找所有以为
    // const help = (path) => {
    //     if(path.length === p.length) {
    //         map.set(path.join(''), true)
    //         return;
    //     }

    //     for(let i = 0; i < p.length; i++) {
    //         if(!path.includes(p[i])) {
    //             path.push(p[i]);
    //             help([...path]);
    //             path.pop();
    //         }
    //     }
    // }

    // help([])
    // const ans = [];
    // let slow = 0;
    // for(let i = 0; i < s.length; i++) {
    //     if(i < p.length -1) continue;
    //     let str = s.slice(slow, i + 1)
    //     if(map.get(str)) {
    //         ans.push(slow);
    //     }
    //     slow++;
    // }
    // return ans;

    let pMap = new Map();
    for(let item of p) {
        pMap.set(
            item,
            (pMap.get(item) || 0) + 1
        )
    }
    const ans = [];
    let slow = 0;
    for(let i = 0; i < s.length; i++) {
        if(i < p.length -1) {
            if(pMap.get(p[i])) {
                const count = pMap.get(p[i]);
                if(count > 1) {
                    pMap.set(
                        p[i],
                        count - 1
                    )
                } else {
                    pMap.delete(p[i])
                }
            }
            continue;
        };
        // let str = s.slice(slow, i + 1)
        if(pMap.has(s[i])) {
            const count = pMap.get(s[i]);
            if(count > 1) {
                pMap.set(
                    p[i],
                    count - 1
                )
            } else {
                pMap.delete(s[i])
            }
        }
        if(slow !== 0) {
            pMap.set(s[i], 1)
        }
        if(pMap.keys() === 0) {
            ans.push(slow);
            pMap.set(
                s[slow],
                1
            )
        }
        slow++;
    }
    return ans;
};

console.log(
    findAnagrams("cbaebabacd", "abc")
);