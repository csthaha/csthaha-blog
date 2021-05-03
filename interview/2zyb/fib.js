function fib(n) {
    let res = [1,1]

    for(let i = 2; i < n; i++) {
        res[i] = res[i - 1] + res[i - 2]
    }

    return res[n - 1]
}

console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
