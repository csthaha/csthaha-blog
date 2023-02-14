function findTargetSumWays(nums, target) {
    const list = []
    const dfs = (index, sum, str) => {
        console.log(str);
        if(index === nums.length) {
            if(sum === target) {
                list.push(str)
            }
            return
        }
        dfs(index + 1, sum + nums[index],  `${str}+${nums[index]}`)
        dfs(index + 1, sum - nums[index], `${str}-${nums[index]}`)
    } 
    dfs(0, 0, '')
    return list
}
// console.log(
//     findTargetSumWays([1,1,1,1,1], 3)
// );
console.log(
    findTargetSumWays([1,1,1,1,1], 5)
);
