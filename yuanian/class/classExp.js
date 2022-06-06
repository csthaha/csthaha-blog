'use strict'
// 父类 Day
class DateClass {
    // constructor
    // 构造函数是一种用于创建和初始化 class 创建对象的特殊方法。‘
    // new 创建实例的时候初始化对象。

    // constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。 return
    constructor({year = '1998', month = '04', day = '23'}) {
        this.year = year;
        this.month = month;
        this.day = day
    }
    //设置当前日期
    setDate(y, m, d) {
        this.year = y;
        this.month = m;
        this.day = d    
    }


    // 方法 
    getDate() {
        return  `${this.year}-${this.month}-${this.day}`
    }
}

class timeClass extends DateClass {
    // constructor 在 创建对象的时候初始化
    constructor(y, m, d, hour, minute, second) {
        //ES6 要求，子类的构造函数必须执行一次super函数。1.可以当作构造函数使用 2.也可当作对象使用
        // 并且必须在 使用 this 前调用
        // 1.super() 执行父类的 constructor 
        // 2.通过 super. 调用父类的方法。
        super({
            year: y,
            month: m,
            day: d
        });
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
    // static 静态方法 不能在类的实例上调用静态方法，而应该通过类（timeClass）本身调用
    static staticFun() {
        console.log(`this is a static funtion of timeClass`);
    }

    // get 语法 将对象 属性 绑定到访问该 属性的时候将被调用的函数
    get getDate() {
        return super.getDate()
    }
    // 获取当前详细时间
    get DetailTime() {
        return `${this.getDate} ${this.geTime()}`
    }

    // set 语法 当尝试设置属性时，set 将对象属性绑定到要调用的函数
    set currenTime({h, m, s}) {
        this.hour = h;
        this.minute = m;
        this.second = s
    }
    // 设置今天日期
    set currenDate({y, month, d}) {
        super.setDate(y, month, d)
    }

    geTime() {
        return `${this.hour}:${this.minute}:${this.second}`
    }
}

const now = new timeClass('1998', '04', '23', '23', '59', '59');

const date = now.getDate
const time = now.geTime()
console.log(`${date} ${time}`);

const nowT = {
    y: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    d: new Date().getDate(),
    h: new Date().getHours(),
    m: new Date().getMinutes(),
    s: new Date().getSeconds()
}
function getCurrenTime(nowTime) {
    now.currenTime = nowTime
    now.currenDate = nowTime
    return now.DetailTime
}
// 当前详细时间
const nowTime = getCurrenTime(nowT)