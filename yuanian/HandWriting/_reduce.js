// reduce 接收一个 cb 函数，以及一个初始化的值。

Array.prototype._reduce = function(cb, initValue) {
    // this 指向的是调用 _reduce 的那个数组。
    if(this.length === 0 && !initValue) {
        throw new TypeError('Reduce of empty array with no initial value');
    }
    let curV = initValue || this[0];
    const startI = initValue ? 0 : 1;
    for(let i = startI; i < this.length; i++) {
        curV = cb(curV, this[i], i, this);
    }
    return curV;
}

var x = [1,2,3]._reduce((a, b) => a * b, 1)
var y = [1,2,3]._reduce((a, b) => a * b)
console.log(x, y); // 6 6