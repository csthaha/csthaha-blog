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
 * @param {number} targetSum
 * @return {number[][]}
 */
function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
}

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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    const res = [];
    const backtrack = (node, sum = Infinity, path = []) => {
        if(!node ) return;
        const val = node.val;
        if(!node.left && !node.right && sum === val) {
            return res.push([...path, val])
        }
        path.push(val);
        backtrack(node.left, sum - val, [...path])
        backtrack(node.right, sum - val, [...path])
        path.pop()
    }
    backtrack(root, targetSum, [])
    return res
};

var pathSum2 = function(root, targetSum) {
    const res = [];
    var getpath = (root, str, sum) => {
        if(!root) return [];
        str.push(root.val)
        sum += root.val
        if(!root.left && !root.right && sum === targetSum) {
            res.push([...str])
        }
        if(root.left) {
            getpath(root.left, [...str], sum)
        }
        if(root.right) {
            getpath(root.right, [...str], sum)
        }
    }
    getpath(root, [], 0)
    return res;
}

console.log(pathSum({val: 2}, 2));

console.log(
    pathSum({
        val: 5,
        left: {
            val: 4,
            left: {
                val: 11,
                left: {
                    val: 7
                },
                right: {
                    val: 2
                }
            }
        },
        right: {
            val: 8,
            left: {
                val: 13
            },
            right: {
                val: 4,
                left: {
                    val: 5
                },
                right: {
                    val: 1
                }
            }
        }
    },
    22)
);