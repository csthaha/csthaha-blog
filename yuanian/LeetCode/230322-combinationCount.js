function combinationCount(target, nums) {
    const ans = [];

    var help = (path, ret, index) => {
        if(ret < 0) return;
        if(ret === 0) {
            ans.push([...path])
            return;
        }

        for(let i = index; i < nums.length; i++) {
            path.push(nums[i]);
            help(path, ret - nums[i], i)
            path.pop()
        }
    }
    help([], target, 0)
    return ans;
}

console.log(
    combinationCount(5, [1,4,5])
);
console.log(
    combinationCount(1,[1])
);

//[[1,4],[5],[1,1,1,1,1]]