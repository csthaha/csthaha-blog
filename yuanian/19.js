/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

  function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }

  const listN = new ListNode(1, new ListNode(2, new ListNode(3)))
//   console.log(listN);
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
     let count = 0;
     let copyHead = head;
     while(head) {
         count++;
         head = head.next;
     }
     let index = count - n + 1
     console.log(count, copyHead, index);
     let ch2 = copyHead;
     for(let i = 0; i < count; i++) {
         if(i === index - 1) {

         } 
     }
};

console.log(removeNthFromEnd(listN, 2));