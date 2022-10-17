// 给定一个长度为 n 的整数数组 arr ，它表示在 [0, n - 1] 范围内的整数的排列。
// 我们将 arr 分割成若干 块 (即分区)，并对每个块单独排序。
// 将它们连接起来后，使得连接的结果和按升序排序后的原数组相同。
// 返回数组能分成的最多块数量。

// 输入: arr = [4,3,2,1,0]
// 输出: 1
// 解释:
// 将数组分成2块或者更多块，都无法得到所需的结果。
// 例如，分成 [4, 3], [2, 1, 0] 的结果是 [3, 4, 0, 1, 2]，这不是有序的数组。

// 输入: arr = [1,0,2,3,4]
// 输出: 4
// 解释:
// 我们可以把它分成两块，例如 [1, 0], [2, 3, 4]。
// 然而，分成 [1, 0], [2], [3], [4] 可以得到最多的块数

var maxChunksToSorted = function (arr) {
    const stack = [];
    for (let i = 0; i < arr.length; i++) {
      a = arr[i];
      if (stack.length > 0 && stack[stack.length - 1] > a) {
        const cur = stack[stack.length - 1];
        while (stack && stack[stack.length - 1] > a) stack.pop();
        stack.push(cur);
      } else {
        stack.push(a);
      }
    }
    console.log(stack);
    return stack.length;
};

console.log(maxChunksToSorted([1,0,2,3,4]));