function fn1() {
    let a = 1;
    return function fn2() {
        a++;
        console.log(a)
    }
}

var f = fn1()

f()
f()
f()