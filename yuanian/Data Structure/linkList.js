// 链表
 // 链表是一种物理 存储单元 上非连续、非顺序的存储结构。
 // 数据元素的逻辑顺序是通过链表中的指针链接次序实现的。
 // 链表由一系列节点（链表中每一个元素称为节点）组成，节点可以在运行时动态生成。
 // 每个节点包括两个部分：一个是存储 数据元素 的数据域，另一个是存储下一个节点地址的指针域。


// 有头链表、无头链表
// 有头链表：指第一个节点只有指针域，而没有数据域
// 无头链表：指第一个节点既有指针域，也有数据域。

class Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}
const node1 = new Node(1);
const noder2 = new Node(2);
node1.next = noder2
console.log(node1)

// 实现链表。

class LinkNode {
    constructor() {
        this.count = 0; // 存储链表中的节点数量
        this.head = null; // 保存头节点 （head 永远指向头节点。）
        this.tail = null; // 保存尾节点 
    }

    // append 向链表尾部添加一个节点
    append(ele) {
        const node = new Node(ele);
        // 链表为空
        if(this.head === null) {
            this.head = node;   // 让 head 指向 node 
        } else {
            // 链表不为空
            let current = null;
            current = this.head;   //保持 head指向头节点。
            while(current.next) {
                // 循环链表，到达尾部。
                current = current.next;
            }
            // 将尾节点的 next 指针指向 node 节点。
            current.next = node
        }
        this.count++;
        return true;
    }

    //insert 向链表的特定位置插入一个元素
    insert(ele, index) {
        // 位置不合法，返回false插入失败
        if(index < 0 || index > this.count) return false;
        const node = new Node(ele);
        let current;
        // 插入到头部
        if(index === 0) {
            current = this.head;   // 先将 head 引用保存到 current
            node.next = current;  // 然后将 node 节点 next 到 current
            this.head = node;   // 最后将 头节点指向node。
        } else {
            // 在链表中间或者尾部添加新节点

            // 获取要插入位置的前一个节点。
            const previous = this.getElementAt(index - 1);
            current = previous.next;
            // 在 previous 和 current 之间插入新节点
             // 将 新节点的 next 指针 指向 current
            node.next = current;
            // / 将 前一个节点的 next 指针指向 新节点
            previous.next = node;
        }
        this.count ++;
        return true;
    }

    // getElementAt 获取当前位置的节点
    getElementAt(index) {
        if(index < 0 || index > this.count) return undefined;
        let node = this.head;
        for(let i = 0; i < index && node !== null; i++) {
            node = node.next;
        }
        return node;
    }

    // remove 从链表中移除元素
    remove(ele) {
        const index = this.indexOf(ele);
        return this.removeAt(index);
    }

    //indexOf 返回指定元素在链表中的 index
    indexOf(ele) {
        let cur = this.head;
        for(let i = 0; i < this.count && cur !== null; i++) {
            if(cur.data === ele) {
                return i;
            }
            // 不想等指向下一个节点。
            cur = cur.next;
        }
        // 不存在链表当中
        return -1;
    }

    // removeAt 根据索引删除链表当中的元素。
    removeAt(index) {
        // 传入的index 参数不是有效位置，返回 undefined，即没有从链表中移除元素
        if(index < 0 || index >= this.count) return undefined;

        let cur;
        if(index === 0) {
            cur = this.head
            // 将头节点指向下一个节点即可。
            this.head = cur.next;
        } else {
            // 获取要删除的前一个元素
            const delNode = this.getElementAt(index - 1);
            cur = delNode.next;
            delNode.next = cur.next;
        }
        this.count--;
        // 返回移除节点的数据域，即要移除的元素
        return cur.data;
    }

    // removeHead 移除首节点
    removeHead() {
        if(this.head === null) return undefined;
        const cur = this.head;
        this.head = cur.next;
        this.count --;
        return cur.data;
    }

    // removeTail 移除尾节点。
    removeTail() {
        if(this.head === null) return undefined;
        if(this.count === 1) {
            this.removeHead()
        }
        const preNode = this.getElementAt(this.count - 2);
        const delNode = preNode.next;
        preNode.next = delNode.next;
        this.count --;
        return delNode.data
    }

    // toString 返回整个链表的字符串
    toString() {
        if(this.head === null) return undefined;
        let cur = this.head;
        let str = ''
        while(cur) {
            str += cur.data;
            cur = cur.next;
        }
        return str;
    }
}

const ln1 = new LinkNode();
ln1.append(1)
ln1.append(2)
ln1.append(3)
console.log(ln1);
// ln1.removeTail(2)
console.log(
    ln1.toString()
);

// 应用：
 // 翻转链表  迭代
 const reverse_linkNode = (head) => {
     console.log(head);
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

 // 递归实现
 const reverse_linkNode_recursion = (head) => {
     if(!head) return null;
     // 旧节点的尾节点， 结束递归。 
     if(!head.next) return head;
     // 进行递归。直到尾节点。
     const newHead = reverse_linkNode_recursion(head.next)
     // 两个节点想通下面代码

     // 进行反向指向:  a -> b 改成 b -> a
     head.next.next = head;
     // a -> null
     head.next = null;
     return newHead;
 }

 console.log(
    reverse_linkNode(ln1.head)
 );