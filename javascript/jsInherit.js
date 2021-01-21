// 1. 原型链继承
function Parent() {
    this.name = 'parent'
    this.play = [1,2,3]
}

Parent.prototype.say = function() {
    return this.name
}

function Child() {
    this.type = 'child'
}

// 验证：每一个构造函数都有一个原型对象 (构造函数通过 prototype )，原型对象又包含一个指向 constructor 构造函数的指针
// console.log(Parent.prototype.constructor === Parent)    // true
// console.log(Child.prototype.constructor === Child)    // true

var child1 = new Parent()   // 这是 parent 的实例，只是通过 prototype 可以访问原型对象上的属性和方法
console.log(child1.play)  // [1,2,3]
child1.play.push(5)
var child2 = new Parent()
console.log(child1.play)   // [1,2,3, 5]  
console.log(child2.play) // [1,2,3] 并不能是 parent 实例变化， 但通过原型链继承则会

// 实现继承 Parent.prototype只是一个指针，指向的是原型对象，利用这个指针可以帮助我们实现js继承。
Child.prototype = new Parent()
// 实现继承  
var child3 = new Child()
console.log(child3.name + '-' + child3.play + '-' + child3.say()) // parent-1,2,3-parent

child3.play.push(4)
// 缺点：两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也会随之变化
var child4 = new Child()
console.log(child4.name + '-' + child4.play + '-' + child4.say()) // parent-1,2,3,4-parent