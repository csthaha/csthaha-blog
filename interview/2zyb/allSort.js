/**
 * @param {string} s
 * @return {string[]}
 */
 var permutation = function(s) {
    let res = []

    const backTrack = (path, index) => {
        if(path.length === s.length) {
            if(!res.includes(path)) {
                res.push(path)
            }
            return
        }

        for(let i = 0; i < s.length; i++) {
            if(path.indexOf(s[i]) > -1 || s[i] === s[ i -1 ] && path.includes(s[i] === -1))continue
            path = path + s[i]
            backTrack(path.slice(), index + 1)
            path = path.slice(0, path.length - 1)

        }
    }

    backTrack('')
    console.log(res);
    // return res.map(item => item.join(''))
};

console.log(permutation("aab"))