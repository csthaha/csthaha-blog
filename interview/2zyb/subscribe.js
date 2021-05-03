// 这是观察者模式？？？
// 收集依赖
class Dep {
    constructor() {
        this.sub = []
    }

    addSub(watch) {
        this.sub.push(watch)
    }

    notify() {
        this.sub.forEach(watcher => watcher.update())
    }
}


class Watcher {
    constructor(cb) {
        this.cb = cb
    }

    // 触发回调的方法
    update() {
        this.cb()
    }
}

let dep1 = new Dep()

let watcher1 = new Watcher(() => {
    console.log('我是第一个')
})

let watcher2 = new Watcher(() => {
    console.log('我是第二个')
})

watcher1.update()

dep1.addSub(watcher1)
dep1.addSub(watcher2)


dep1.notify()


console.log(dep1.sub)