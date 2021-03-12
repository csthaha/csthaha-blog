// 防抖，防止多次触发，只执行最后一次。

function _debounce(fn, time) {
    var timer = null;       // 维护一个 timer
    return function() {
        var _this = this,       // 取debounce执行作用域的this
            args = arguments
        if(timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function() {
            fn.apply(_this, args)   // 用apply指向调用debounce的对象，相当于_this.fn(args);
        }, time)
    }
}