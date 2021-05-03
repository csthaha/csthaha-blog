/**
 * @param {string} s
 * @return {string[]}
 */
 var permutation = function(s) {
    let res = []

    const backTrack = (path) => {
        if(path.length === s.length) {
            res.push(path)
            return
        }

        for(let i = 0; i < s.length; i++) {
            if(!path.includes(s[i])) {
                path.push(s[i])
                backTrack(path.concat())
                path.pop()
            }
        }
    }

    backTrack([])
    return res.map(item => item.join(''))
};

console.log(permutation("aab"))