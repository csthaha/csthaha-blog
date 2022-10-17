// 例子：
// 使用策略模式计算奖金；

// 比如公司的年终奖是根据员工的工资和绩效来考核的，
// 绩效为A的人，年终奖为工资的4倍，绩效为B的人，年终奖为工资的3倍，绩效为C的人，年终奖为工资的2倍；

const performanceA = {
    caculate: function(salary) {
        return salary * 4
    }
}
const performanceB = {
    caculate: function(salary) {
        return salary * 3
    }
}
const performanceC = {
    caculate: function(salary) {
        return salary * 2
    }
}

const performanceD = {
    caculate: function (salary) {
        return salary
    }
}

class Bouns {
    constructor(salary, info) {
        this.salary = salary;
        this.info = info;
    }

    set setSalary(salary) {
        this.salary = salary;
    }

    set setInfo(fun) {
        this.info = fun
    }

    get money() {
        return this.info.caculate(this.salary)
    }
}

var bounsA1 = new Bouns(10000, performanceA);
var bounsA2 = new Bouns(5000, performanceA);

var bounsB1 = new Bouns();
bounsB1.setSalary = 10000;
bounsB1.setInfo = performanceB;

var bounsB2 = new Bouns();
bounsB2.setSalary = 5000;
bounsB2.setInfo = performanceB;

const bounsD = new Bouns(2000, performanceD)

console.log(
    bounsA1.money, 
    bounsA2.money, 
    bounsB1.money, 
    bounsB2.money,
    bounsD.money
);


// copyWithin 复制当前数组某个/些位置的值到另一个/些位置   
// 改变原数组，不会返回新数组。

const array1 = ['a', 'b', 'c', 'd', 'e'];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]

// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
