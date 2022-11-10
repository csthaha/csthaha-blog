function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, 15, 7))
console.log(tree);


var maxDepth = function(root) {
    if(!root) return 0;
    if(!root.left && !root.right) return 1;
    let deep = 1;
    let leftDeep = 0;
    let rightDeep = 0;
    if(root.left) {
        leftDeep += maxDepth(root.left);
    }
    if(root.right) {
        rightDeep += maxDepth(root.right);
    }
    return deep + (leftDeep > rightDeep ? leftDeep : rightDeep);
}

var maxDepth2 = function (root) {
    if(!root) return 0;
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return Math.max(left, right) + 1;
}

//  形成鲜明对比啊。自己还是很菜的啊。

console.log(maxDepth(tree));

const tree2 = new TreeNode(1, undefined, new TreeNode(2))
console.log(maxDepth(tree2));

console.log(maxDepth(
    {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 3
            }
        },
        right: {
            val: 4,
            left: {
                val: 5,
                right: {
                    val: 7
                }
            },
            right: {
                val: 6
            }
        }
    }
));

//       1
//     /    \
//   2       4
//  /       /  \
// 3       5    6
//          \
//            7 