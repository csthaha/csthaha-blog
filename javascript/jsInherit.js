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

// 2. 构造函数继承
console.log('----------2.构造函数继承----------')

function Parent1() {
    this.name = 'parent1'
}

Parent1.prototype.getName = function() {
    return this.name
}

function Child5() {
    Parent1.call(this)
    this.type = 'child5'
}

let child5 = new Child5();
console.log(child5) // Child5 { name: 'parent1', type: 'child5' }
// 所以除了 Child5 的属性 type 之外，也继承了 Parent1 的属性 name

// console.log(child5.getName())       // TypeError
// 问题是，父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法。

// 3. 组合继承（原型链、构造函数组合继承）
console.log('----------3.组合继承----------')

function Parent6() {
    this.name = 'parent6'
    this.play = [1,3,5]
}

Parent6.prototype.getName =  function() {
    return this.name
}

function Child6() {
    Parent6.call(this)
    this.type = 'child6'    //构造函数继承
}

Child6.prototype = new Parent6()    // 原型链继承（改变了 Child6 的原型对象）

Child6.prototype.constructor = Child6

var child7 = new Child6()
var child8 = new Child6()
child7.play.push(7)
console.log(child7.play, child8.play)       // [ 1, 3, 5, 7 ] [ 1, 3, 5 ] 互不影响了 
console.log(child7.getName(), child8.getName()) // parent6 parent6

// 4. 原型式继承
console.log('----------4.组合继承----------')
let parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      return this.name;
    }
  };
  let person4 = Object.create(parent4);
  person4.name = "tom";
  person4.friends.push("jerry");
  let person5 = Object.create(parent4);
  person5.friends.push("lucy");
  console.log(person4.name);        // tom
  console.log(person4.name === person4.getName());      // true
  console.log(person5.name);        // parent4
  console.log(person4.friends);     // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]
  console.log(person5.friends);     // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]