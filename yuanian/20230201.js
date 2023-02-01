async function a() {
    console.log('a start');
    await b();
    console.log('a end');
}
async function b() {
    console.log('b');
}
  
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);  
a();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

// script start、a start、b、promise1、script end、a end、promise2、setTimeout

// async/await 是以更舒适的方式适用 promise 的一种特殊语法。
// 关键字 await 让 javascript 引擎等待直到 promise 完成并返回结果。


// 实现一个带并发限制的 promise 调度器

// class Scheduler {
//     add(promiseCreator) { ... }
//     // ...
// }
     
// const timeout = time => new Promise(resolve => {
//     setTimeout(resolve, time);
// })
    
// const scheduler = new Scheduler();
    
// const addTask = (time,order) => {
//     scheduler.add(() => timeout(time).then(()=>console.log(order)))
// }
  
// addTask(1000, '1');
// addTask(500, '2');
// addTask(300, '3');
// addTask(400, '4');

// output: 2 3 1 4

class Scheduler {
    // 初始化
    constructor() {
        this.queue = [];
        this.maxCount = 2;
        this.runningCount = 0;
    }

    add(asyncTask) {
        this.queue.push(asyncTask);
    }

    start() {
        for(let i = 0; i < this.maxCount; i++) {
            this.request();
        }
    }

    request() {
        if(!this.queue || !this.queue.length || this.runningCount >= this.maxCount) return;
        this.runningCount ++;
        this.queue.shift()().finally(() => {
            // 执行完一个之后，运行数量减少、且再调用一个。
            this.runningCount --;
            this.request()
        })
    }
}

const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

const scheduler = new Scheduler();

const addTask = (time,order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000, '1');
addTask(500, '2');
addTask(500, '3');
addTask(4000, '4');
addTask(8000, '5');
addTask(4000, '5.1');
addTask(2000, '6');
addTask(2000, '7');
addTask(2000, '8');
  
scheduler.start()


// 花开花谢不间断，春来不想干；唯有此花开不厌，一年常占四时春。
// 理解：人生不断遇到各种各样，形形色色的人，这些人可能只是个生命中的过客，与你没有什么干系。
// 但是呢，总会有那么个人，你觉得百看不厌，你觉得甚是喜欢。而她也占满了你的整个生命。