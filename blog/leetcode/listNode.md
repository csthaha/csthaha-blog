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

#### 02.02 返回倒数第 K 个节点
> 输入： 1->2->3->4->5 和 k = 2 输出： 4
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
 * @param {number} k
 * @return {number}
 */
// 法一：
var kthToLast = function(head, k) {
    // 返回倒数第 k 个节点，就是相当于第 length - k + 1 个节点
    var len = 0, cur = head;
    while(head) {
        // 求链表长度
        len++;
        head = head.next;
    }

    for(let i = 1; i < len - k + 1; i++) {
        // 返回的节点
        cur = cur.next
    }
    return cur.val
};
```
```javascript
// 法二：双指针。快慢指针之间相差 k 返回慢指针节点。
var kthToLast = function(head, k) {
    let fast = head;
    let low = head;
    let n = 0
    while(fast) {
        fast = fast.next;
        if (n >= k) {
            low = low.next;
        }
        n++;
    }
}
``` 