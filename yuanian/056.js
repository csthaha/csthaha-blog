//  二叉搜索树中 两个节点之和。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */


/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
 var findTarget = function(root, k) {
    const getTree = (root) => {
        const list = [root];
        const tree = []
        while(list.length) {
            const node = list.shift();
            tree.push(node.val);
            node.left && list.push(node.left);
            node.right && list.push(node.right)
        }
        return tree;
    }
    const t = getTree(root).sort((a, b) => a - b);

    let start = 0,
        end = t.length - 1,
        res = false;
    while(start < end) {
        if(t[start] + t[end] === k) {
            res = true;
            break;
        } else if(t[start] + t[end] < k) {
            start++;
        } else {
            end--;
        }
    }
    return res;

};


// 官方题解：

var findTarget = function(root, k) {
    const set = new Set();
    const helper = (root, k) => {
        if (!root) {
            return false;
        }
        if (set.has(k - root.val)) {
            return true;
        }
        set.add(root.val);
        return helper(root.left, k) || helper(root.right, k);
    }
    return helper(root, k);
};