### leetcode-链表
> 链表(Linked List) 是一种常见的基础数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一节点的指针。

#### 206.反转链表
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let cur = head,  // 定义一个 cur 当前指针，head 指向它
        pre = null;  // pre 指针为 null
    while(cur) {
        let temp;   // 类似交换两个值，定义一个变量。
        temp = cur.next;    // 将 链表从当前节点断开，cur.next 保存在 temp 中
        cur.next = pre;     // 当 链表进行反转，指向上一个。
        pre = cur;      // pre 进行往后移动一步，指向 cur
        cur  = temp;    // cur 指向 temp 即后面的链表
    }
    return pre
};
```