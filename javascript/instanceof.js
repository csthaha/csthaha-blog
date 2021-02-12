function Person(name, age) {
    this.name = name;
    this.age = age;
}

const cst = new Person('cst', 23)

console.log(cst instanceof Person)  // true instanceof 用于检测实例是否在构造函数的原型上
console.log(Person.prototype === cst.__proto__)     // true 构造函数的 prototype 是否出现在某个 实例的原型链上

const myInstanceof = function (instance, constructor) {
    let pro = constructor.prototype
    while(true) {
        if(instance === null) {
            return false
        }
        if( instance.__proto__ === pro ) {
            return true
        }

        instance = instance.__proto__
    }
}

console.log(myInstanceof(cst, Person))  // true
console.log(myInstanceof(cst, Object))  // true