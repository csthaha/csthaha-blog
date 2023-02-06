/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */


// 想要计算根节点的值 就需要知道 左右孩子的值。 => 递归。
// root = [2,1,3,null,null,0,1]    是 层次遍历。


/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var evaluateTree = function(root) {
    // const rootv = root.v === 2 ? (root.left || root.right) : (root.left && root.right);
    if(!root) return;
    const rootNode = root;
    if(!rootNode.left) return rootNode.val;
    const leftNode = evaluateTree(root.left)
    const rightNode = evaluateTree(root.right)
    return rootNode.val === 2 ? (leftNode || rightNode) : (leftNode && rightNode)
};