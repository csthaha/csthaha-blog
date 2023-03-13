// var maxSlidingWindow = function(nums, k) {
//     let left = 0,
//         right = k - 1;
//     // 当前窗口最大值。
//     var getMax = list => {
//         return list.sort((a, b) => b - a)[0]
//     }
//     const res = []
//     for(let i = right; i < nums.length; i++) {
//         res.push(getMax(nums.slice(left, i + 1)))
//         left += 1;
//     }
//     return res;
// };

// 超出时间限制 

// 利用双端队列特性 一直维护当前窗口 从队首到队尾递减的双端队列。

var maxSlidingWindow = function (nums, k) {
    const res = [];
    const dequeue = new Dequeue([]);
    // 前 k - 1 个数入队
    for (let i = 0; i < k - 1; i++) {
      dequeue.push(nums[i]);
    }
    // 滑动窗口
    for (let i = k - 1; i < nums.length; i++) {
      dequeue.push(nums[i]);
      res.push(dequeue.max());
      dequeue.shift(nums[i - k + 1]);
    }
    return res;
  };
  class Dequeue {
    constructor(nums) {
      this.list = nums;
    }
  
    push(val) {
      const nums = this.list;
      // 保证数据从队头到队尾递减
      while (nums[nums.length - 1] < val) {
        nums.pop();
      }
      nums.push(val);
    }
  
    // 队头出队
    shift(val) {
      let nums = this.list;
      if (nums[0] === val) {
        // 这里的js实现shift()理论上复杂度应该是O(k), 就不去真实实现一个O(1)出队的队列了，意思到位即可
        nums.shift();
      }
    }
    max() {
      return this.list[0];
    }
  }

console.log(
    maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)
);
