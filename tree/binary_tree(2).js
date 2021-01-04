// 非递归遍历，正常创建 二叉树

// 二叉树的创建     https://www.jianshu.com/p/ad1a9da1547a
/**
 * 节点 node
 */

 function createNode(data, left, right) {
    this.data = data
    this.left = left
    this.right = right
 }

 /**
  * 构造函数 createTree
  */

 function createTree() {
     this.root = null;
 }

 /**
  * 
  * @param {*} data 节点的值
  */

 createTree.prototype.insertNode = function(data) {
     var node = new createNode(data, null, null)
     if(this.root == null) {
         this.root = node
     } else {
         insert(this.root, node)    // 传入根节点 root， 和新节点。insert 中进行递归进行更换 root
     }
 }

 /**
  * 插入方法
  * @param {*} node 节点
  * @param {*} newNode 被插入的新节点
  */

 var insert = function(node, newNode) {
     // 判断新节点往哪边插入
    if(newNode.data < node.data) {
        if(node.left == null) {
            node.left = newNode     // 如果该节点左侧没有左侧子节点，则在该处插入新节点
        } else {
            // 如果有的话, 进行递归下一层
            insert(node.left, newNode)
        }
    } else {
        if(node.right == null) {
            node.right = newNode
        } else {
            insert(node.right, newNode)
        }
    }
 }

 function createBinaryTree(arr) {
     var bst = new createTree();
     for(let i = 0; i < arr.length; i++) {
         bst.insertNode(arr[i])
     }

     return bst.root
 }

 const myTree = createBinaryTree([10, 5, 12, 4, 7])

 console.log(myTree)
//                                           10 
//                                         /   \
//                                       5     12 
//                                      / \    
//                                     4   7  
                        

// https://segmentfault.com/a/1190000011053277
// 前序遍历非递归

function preOrder(root) {
    // 利用栈的思想：先进后出
    var nodeList = [], res = []
    if(root) {
        nodeList.push(root)
    }

    while(nodeList.length) {
        var node = nodeList.pop()
        res.push(node.data)
        //由于栈先进后出，所以先从右边放入
        if(node.right) {
            nodeList.push(node.right)
        }
        if(node.left) {
            nodeList.push(node.left)
        }
    }
    return res
}
const preOrderRes =  preOrder(myTree)
console.log('前序：', preOrderRes);     // 10, 5, 4, 7, 12

// 中序遍历非递归
function inOrder(root) {
    var orderList = [], res = []
    while(true) {
        while(root) {   // 先将root左子树全放进 orderList，然后再输入
            orderList.push(root) 
            root = root.left
        }

        if(orderList.length == 0) { // 最终遍历完之后，跳出
            break;
        }

        var node = orderList.pop();
        res.push(node.data);
        root = node.right
    }
    return res
}
const inOrderRes = inOrder(myTree)
console.log('中序：' , inOrderRes); // 4, 5, 7, 10, 12

// 后序遍历
function afterOrder(root) {
    var nodeList = [], res = []
    if(root) {
        nodeList.push(root)
    }
    while(nodeList.length) {
        var node = nodeList.pop()
        if(node.left) {
            nodeList.push(node.left)
        }
        if(node.right) {
            nodeList.push(node.right)
        }
        res.push(node.data)
    }
    return res.reverse()
}
const afterOrderRes = afterOrder(myTree)
console.log('后序：', afterOrderRes);   // 4, 7, 5, 12, 10