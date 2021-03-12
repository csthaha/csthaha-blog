setTimeout(function() {console.log(1)}, 0);

new Promise(function(resolve, reject) {
  console.log(2)
  for (var i = 0; i < 10000; i++) {
    if(i === 10) {console.log(10)}
    if(i == 99){
        resolve(55)
    }
  }
   console.log(3)
}).then(function(res) {
    console.log(res)
   console.log(4)
   
}).then(res => {
    console.log(res)
})

// console.log(5);


console.log(3 | 4)
//  11
// 100
// 111

// 0111   7
// 1000   8 

// 1111