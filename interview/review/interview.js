// console.log('----------4.组合继承----------')
// let parent4 = {
//     name: "parent4",
//     friends: ["p1", "p2", "p3"],
//     getName: function() {
//       return this.name;
//     }
//   };
//   let person4 = Object.create(parent4);
//   person4.name = "tom";
//   person4.friends.push("jerry");
//   let person5 = Object.create(parent4);
//   person5.friends.push("lucy");
//   console.log(person4.name);        // tom
//   console.log(person4.name === person4.getName());      // true
//   console.log(person5.name);        // parent4
//   console.log(person4.friends);     // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]
//   console.log(person5.friends);     // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]


// const source = {a: 1}
// const source2 = {a: 2, b: 2}

// const res = Object.assign({a: 3, c: 0}, source, source2)

// res.a = 5

// console.log(res, source, source2)


const source = {a: 1, b: 2}
const source2 = {b: 3, c: 4}

const res = Object.assign(...[source, source2]) // {a: 1, b: 3, c: 4}
console.log(res)