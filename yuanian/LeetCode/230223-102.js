/** 102 二叉树的层次遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */

// 时间复杂度：每个点进队出队各一次，故渐进时间复杂度为 O(n)。
// 空间复杂度：队列中元素的个数不超过 nnn 个，故渐进空间复杂度为 O(n)。

var levelOrder = function(root) {
    if(!root) return [];
    const res = [];
    const list = [root];
    while(list.length) {
        let copyList = [...list];
        const arr = []
        for(let item of copyList) {
            arr.push(item.val)
            if(item.left) {
                list.push(item.left)
            }
            if(item.right) {
                list.push(item.right)
            }
            list.shift()
        }
        res.push(arr)
    }
    return res;
};