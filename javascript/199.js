var rightSideView = function(root) {
    if(!root) return []
    let res = [],
        parent = [root],
        children = []
    while(parent.length > 0) {
        // let len = parent.length
        // while(len--) {
        //     let cur = parent.shift()
        //     cur.left && parent.push(cur.left)
        //     cur.right && parent.push(cur.right)
        //     if(len == 0) {
        //         res.push(cur.val)
        //     }
        // }
        let cur = parent.shift();
        cur.left && children.push(cur.left)
        cur.right && children.push(cur.right)
        if(parent.length === 0) {
            res.push(cur.val)
            parent = children
            children = []
        }
    }
    return res

};