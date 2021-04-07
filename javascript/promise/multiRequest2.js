function moreMultiRequest(urls, maxNum) {
    var ret = []  // 任务队列
    let i = 0;  // 请求个数
    let promise = new Promise(r => r())
    const backTrak = () => {
        if(i >= urls.length) {
            // return promise
            return
        }

        const task = request(urls[i++]).finally(() => {
            backTrak()
        })

        ret.push(task)
    }

    while(i < maxNum) {
        backTrak()
    }

    // return promise.then(() => Promise.all(ret))
    return Promise.all(ret)
}

function request(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
            console.log(url)
        }, 1000);
    })
}

moreMultiRequest([1,2,3,4], 2)
