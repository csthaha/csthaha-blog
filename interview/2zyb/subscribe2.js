// 发布订阅者模式

// 发布者->事件中心<=>订阅者，订阅者需要向事件中心订阅指定的事件 -> 发布者向事件中心发布指定事件内容 -> 事件中心通知订阅者 -> 订阅者收到消息（可能是多个订阅者），到此完成了一次订阅发布的流程。

class Event {
    constructor() {

        // 订阅者 -> 对象的原因：订阅的类型，和 回调
        this.listeners = {
            // eventType: [
            //     () => {}
            // ]
        }
    }

    // 订阅事件
    /**
     * 
     * @param {订阅的类型} eventType 
     * @param {订阅后发布动作触发的回调函数} listener 
     */
    on(eventType, listener) {
        if(!this.listeners[eventType]) this.listeners[eventType] = []
        this.listeners[eventType].push(listener)
    }

    // 发布事件
    /**
     * 
     * @param {事件的类型} eventType 
     * @param {发布的内容} data 
     */
    emit(eventType, data) {
        const cbs = this.listeners[eventType]
        if(cbs) {
            cbs.forEach(element => {
                element(data)
            });
        }
    }
}

const e = new Event()

// 订阅
e.on('open', data => {
    console.log(data)
})

e.on('open', data => {
    console.log(data.open)
})

e.on('close', data => {
    console.log(data.open)
})

// 发布
e.emit('open', {open: true})

console.log(e)