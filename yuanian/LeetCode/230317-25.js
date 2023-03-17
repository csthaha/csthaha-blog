// 给定一个链表，每隔 k 个元素做一次反转。

// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> null  k =  3;
// 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 8 -> 7 -> null

/**
 * 给定一个链表，每隔 k 个元素做一次反转。
 * @param {Node} head 
 * @param {Number} k 
 */
function rollback(head, k) {
    if(!head) return;
    let cur = head;
    let count = 1;

    // 进行链表反转
    var reverse_linkNode = node => {
        // if(!node) return;
        // if(!node.next) return node;
        // const newHead = reverse_linkNode(node.next);
        // node.next.next = node;
        // node.next = null;
        // return newHead;

        if(!head) return null;
        let cur = head;
        let pre = null;
        while(cur) {
            //  const nextNode = cur.next;
            //  cur.next = pre;
            //  pre = cur;
            //  cur = nextNode;
            [cur.next, pre, cur] = [pre, cur, cur.next]
        }
        return pre;
    }
    let ans = new LinkNode();
    let pre = ans;
    while(cur && cur.next) {
        cur = cur.next;
        count++;
        if(count % k === 0 || !cur.next) {
            // 需要进行交换。
            let next = cur.next;
            cur.next = null;
            
            ans.next = reverse_linkNode(head);
            // 将 tail 移动到末尾
            while(ans.next) {
                ans = ans.next;
            }

            head = next;
            cur  =  next;
            count = 1;
        }
    }
    return pre.next;
}


// 解法二： 递归求解
function rollback_recursion(head, k) {
    var reverse = function (a, b) {
        let pre = null, cur = a, next = a;
        while(cur != b){
            next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        return pre
    }

    if(!head) return null;
    let a = head;
    let b = head;
    for(let i = 0; i < k; i++) {
        if(!b) return head;  // 不足 k 个
        b = b.next;
    }
    let newHead = reverse(a, b);
    a.next = rollback_recursion(b, k)
    return newHead;
}



class LinkNode {
    constructor(val, next)  {
        this.val = val
        this.next = next;
    }
}

console.log(
    rollback(
        {
            val: 1,
            next: {
                val: 2,
                next: {
                    val: 3,
                    next: {
                        val: 4,
                        next: {
                            val: 5,
                            next: {
                                val: 6,
                                next: {
                                    val: 7,
                                    next: {
                                        val: 8,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        3
    ),
    rollback_recursion(
        {
            val: 1,
            next: {
                val: 2,
                next: {
                    val: 3,
                    next: {
                        val: 4,
                        next: {
                            val: 5,
                            next: {
                                val: 6,
                                next: {
                                    val: 7,
                                    next: {
                                        val: 8,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        3
    )
);