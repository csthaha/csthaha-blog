/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function(employees, id) {
    let employee = employees.find(em => em[0] === id)
    if(!employee) return;
    // 中药都
    let ans = employee[1];
    // 找出所有下属呗
    let stack = employee[2]
    while(stack.length) {
        let id = stack.shift();
        let curEm = employees.find(em => em[0] === id)
        ans += curEm[1]
        stack.push(...curEm[2])
    }
    return ans;
};

console.log(
    GetImportance([[1, 5, [2]], [2, 3, [3]], [3, 3, []]], 1)
);
console.log(
    GetImportance([[1,2,[5]],[5,-3,[]]], 5)
);