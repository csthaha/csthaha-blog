function slideWindow(str) {
    let l = 0, r = 0;
    let reString = '', maxLength = 0;
    while(r < str.length && l <= r) {
        if(reString.indexOf(str[r]) > -1) {
            reString = reString.slice(1)
            l++;
        } else {
            maxLength = maxLength > (r - l + 1) ? maxLength : (r - l + 1);
            reString += str[r]
            r++;
        }
    }
    return maxLength
}

console.log(slideWindow('sfgf'));       // 3
console.log(slideWindow('sffag'));      // 3
console.log(slideWindow('aaaa'));       // 1
console.log(slideWindow('sffa'));       // 2