### 树

#### 二叉树 
> 二叉树(binary tree) 每个结点最多只能有两棵子树，且有左右之分。二叉树是 n 个有限元素的集合，该集合或者为空、或者由一个称为根(root) 的元素及两个不相交的、被分别称为左子树和右子树的二叉树组成，是有序树。当集合为空时，称该二叉树为空二叉树。

二叉树的相关操作：
    
        - js 创建（写死）
        - 前（root -> left -> right）
        - 中（left -> root -> right）
        - 后（left -> right -> root）序遍历（递归）

##### 一：
```javascript
    // 二叉树创建 1：（写死）
    //                                           A 
    //                                         /   \
    //                                       B     C 
    //                                      / \    / \
    //                                     D   E  F   G
    // 前序遍历： A B D E C F G
    // 中序遍历： D B E A F C G
    // 后序遍历： D E B F G C A

    function TreeNode() {
        let node = function(val){
            this.data = val;
            this.left = null;
            this.right = null;
        }

        this.createTree = function() {
            let tree = new node('A');
            tree.left = new node('B');
            tree.right = new node('C');
            tree.left.left = new node('D')
            tree.left.right = new node('E')
            tree.right.left = new node('F')
            tree.right.right = new node('G')
            return tree
        }
    }

    // 创建一个写死二叉树
    let myTree = new TreeNode()
    console.log(myTree.createTree())

    // 前序遍历 递归
    function beforeOrder(root) {
        if(root == null) return;
        console.log(root.data);
        beforeOrder(root.left);
        beforeOrder(root.right)
    }
    console.log('前',beforeOrder(myTree.createTree()))   // A B D E C F G
    
    // 中序遍历 （递归)
    var res = []
    function inOrder(root) {
        if(root == null) return;
        inOrder(root.left);
        // console.log(root.data)
        res.push(root.data)
        inOrder(root.right)
    }
    inOrder(myTree.createTree())
    console.log('中序：',res) //  D B E A F C G

    // 后序遍历 （递归）
    function afterOrder(root) {
        if(root == null) return;
        afterOrder(root.left)
        afterOrder(root.right)
        console.log(root.data)
    }
    console.log('后序: ', afterOrder(myTree.createTree()))  //D E B F G C A
```

##### 二：（非递归）
