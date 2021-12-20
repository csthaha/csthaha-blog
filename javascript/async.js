 function fn() {
    console.log(5);
    return Promise.resolve(6)
}

async function asyncFn() {
    console.log(3);
     fn().then(res => {
        console.log(res);
    })
    console.log(1);
}

async function myLog() {
    await asyncFn()
    console.log(2);
}

myLog()