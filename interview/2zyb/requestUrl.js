function requestUrl(urls, num) {
    let ret = [],
        i = 0;

    const track = () => {
        if(i > urls.length) {
            return
        }

        let task = request(urls[i++]).finally(() => {
            console.log(ret)
            track()
        })
        ret.push(task)
    }

    while(i < num) {
        track()
    }

    return Promise.all(ret)
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
requestUrl(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'], 2)