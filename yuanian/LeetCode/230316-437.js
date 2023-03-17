/** 前缀和相关？？
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {

    // lc 560: 树的题 是不是跟 数组一样 ？？ 和 为 k 的字数组？？？
    let count = 0;
    const map = new Map();
    map.set(0, 1);   // 初始化
    // 进行遍历
    var dfs = (node, curSum) => {
        if(!node) return;
        curSum += node.val;
        // 存在前缀和 为 curSum - targetSum 的情况。
        if(map.has(curSum - targetSum)) {
            count += map.get(curSum - targetSum)
        }
        map.set(
            curSum,
            (map.get(curSum) || 0) + 1,
        )
        dfs(node.left, curSum);
        dfs(node.right, curSum);
        // 递归结束后 我们需要将 哈希表中 当前节点的前缀和的出现次数减去 1， 以便下一次递归时后不会出错。
        // 是否有点回溯的思想。
        map.set(curSum, map.get(curSum) - 1);
    }

    // 递归实现：
    // if(!root) return 0;
    // let count = 0;

    // var help = (node, sum) => {
    //     if(!node) return;
    //     sum += node.val;
    //     if(sum === targetSum) {
    //         count++;    
    //     }
    //     help(node.left, sum);
    //     help(node.right, sum)
    // }

    // // 遍历 树 => 多少种树
    // var traverse = node => {
    //     if(!node) return;
    //     help(node, 0);
    //     traverse(node.left);
    //     traverse(node.right);
    // }

    // traverse(root);
    // return count;
};