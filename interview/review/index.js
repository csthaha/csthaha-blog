var a  =1

const obj = {
    a: 2,
    b: () => {
        console.log(this.a)
    },
    c() {
        console.log(this.a)
    }
}

obj.b();
var m = obj.c
// console.log(process)
m()
obj.c()
// a.toFixed(1)

// const a = 1;
