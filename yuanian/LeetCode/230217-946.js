/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
// var validateStackSequences = function(pushed, popped) {
//     const copyPopped = [...popped];
//     const stack = [];
//     let i = 0
//     while(copyPopped.length) {
//         const cur = copyPopped.shift();
//         if(stack.length) {
//             const popItem = stack.pop();
//             if(popItem === cur) {
//                 continue;
//             } else {
//                 stack.push(popItem)
//             }
//         }
//         for(let j = i; j < pushed.length; j++) {
//             stack.push(pushed[j]);
//             if(pushed[j] === cur) {
//                 stack.pop();
//                 i = j + 1;
//                 break;
//             }
//         }

//     }
//     return !stack.length;
// };


var validateStackSequences = function(pushed, popped) {
    const stack = [];
    for(let i = 0, j = 0; i < pushed.length; i++) {
        stack.push(pushed[i]);

        while(stack.length && stack[stack.length - 1] === popped[j]) {
            j++;
            stack.pop()
        }
    }
    return stack.length === 0
};



console.log(
    validateStackSequences([1,2,3,4,5], [4,5,3,2,1])
);
console.log(
    validateStackSequences([1,2,3,4,5], [4,3,5,1,2])
);
console.log(
    validateStackSequences([0], [0])
);
console.log(
    validateStackSequences([0,1], [1,0])
);
console.log(
    validateStackSequences([2,1,0], [2,1,0])
);
console.log(
    validateStackSequences([2,1,0], [1,2,0])
);
