/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */  
/** 105 已知 前序遍历数组、中序遍历数组 求树。
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(preorder.length === 0 && inorder.length === 0) return null;
      if(preorder.length === 1 &&  inorder.length === 1) return new TreeNode(preorder[0])
      const rootV = preorder[0]   // 根节点
      const rootI = inorder.indexOf(rootV) 
      const leftTree = buildTree(preorder.slice(1, rootI + 1), inorder.slice(0, rootI)); // 左子树
      const rightTree = buildTree(preorder.slice(rootI + 1), inorder.slice(rootI + 1)) // 柚子树
      const tree = new TreeNode(rootV, leftTree, rightTree)
      return tree
  };