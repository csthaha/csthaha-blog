// 模拟网络请求队列

function multiRequest(urls, maxNum) {
    const ret = [];
    let i = 0;
    let resolve;
    const promise = new Promise(
        function(r) {
            return resolve = r
        }
    );
    const addTask = () => {
        if(i >= urls.length) {
            return resolve()
        }
        const task = request(urls[i++]).finally(() => {
            // console.log('两次')
            // addTask()
            addTask()
        })
        console.log('task is', task)
        ret.push(task)   
    } 
    while(i < maxNum) {
        // console.log('i is', i)
        addTask();
    }
 
    return promise.then(() => Promise.all(ret))
}
// 模拟请求
function request(url) {
    return new Promise(r => {
        const time = 1000;
        setTimeout(() => {
            console.log(url),
            r(url)
        }, time)
    })
}
multiRequest(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'], 2)