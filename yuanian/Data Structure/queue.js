// 队列
//  队列是一种遵循先进先出原则的线性表。队列只允许在队列的尾部添加元素，
//    在队列的头部删除元素。新添加的元素必须排在队列的末尾。（最常见的列子就是排队，）

// （可以基于 对象 或 数组 创建一个队列。）

// 基于对象的队列
class Queue {
    constructor() {
        this.count = 0;  // 队列元素个数
        this.firstKey = 0;  // 第一个元素的key
        this.items = {}  // 队列元素
    }

    // 向队列尾部添加一个新的元素
    enqueue(ele) {
        this.items[this.count] = ele
        this.count++;
    }

    // 删除队列头部元素
    dequeue() {
        // 队列为空 返回  undefined
        if(this.isEmpty()) return undefined

        const ele = this.items[this.firstKey];
        delete this.items[this.firstKey];
        this.count--;
        this.firstKey++;
        return ele
    }

    // 查看 队列头部元素
    head() {
        if(this.isEmpty()) return undefined

        return this.items[this.firstKey]
    }

    // 查看队列尾部元素
    tail() {
        if(this.isEmpty()) return undefined;

        return this.items[this.count - 1]
    }

    // 判断队列是否为空
    isEmpty() {
        return this.size() === 0
    }

    // 清空队列
    clear() {
        this.items = {};
        this.count = 0;
        this.firstKey = 0;
    }

    // 返回队列的大小
    size() {
        return this.count;
    }

    // 打印队列
    print() {
        if (this.isEmpty()) {
            return '';
        }
        
        let objString = `${this.items[this.firstKey]}`;
        for (let i = this.firstKey + 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`;
        }
        
        return objString;
    }

}

const q1 = new Queue()
q1.enqueue(2)
console.log(
    q1.head(),
    q1.tail(),
    q1.isEmpty(),
    q1.size(),
    q1.print(),
    q1.dequeue(),
    'delete: ',
    q1.head(),
    q1.tail(),
    q1.isEmpty(),
    q1.size(),
    q1.print(),
);


// 队列的应用：
    // 1. 斐波那契数列：0、1、1、2、3、5、8、13、21、34、……
    // 斐波那契数列是一个非常经典的问题，有着各种各样的解法，比较常见的是递归算法，其实也可以使用队列来实现。
    // F(0) = 0,   F(1) = 1
    // F(N) = F(N - 1) + F(N - 2), 其中 N > 1
    
    // 思路：
// 先将 0 和 1 添加到队列中，然后使用 while 循环，使用 index 变量来计数，当 index < n - 2 时终止循环：
// ● 使用 dequeue 方法从队列头部删除一个元素，，该元素为 del_item
// ● 使用 head 方法获得队列头部的元素，该元素为 head_item
// ● del_item + head_item = next_item，将 next_item 放入队列，注意：只能从队列尾部添加元素
// ● 然后将变量 index 加 1   
// 当循环结束时，队列里面会有两个元素，先使用 dequeue 方法删除头部元素，剩下的那个元素就是我们要计算的第 n 项的结果


// 2. 约瑟夫环
// 有一个长度为 a 的数组，存放 0~99 的数字，要求每隔两个数删掉一个数，
// 到末尾时循环至开头继续进行删除操作，求最后一个被删掉的数。

// 利用队列的思想：
// 解题思路：先把这 100 个数放入队列中，while 循环，当队列里只剩一个元素时，就终止 while 循环。、

// 1. 从队列头部删除一个元素，然后 index 变量加 1
// 2. 判断 index % 3 的结果是否为 0，如果为 0，就说明这个元素是需要删除的元素，
// 如果不等于0，就不是需要被删除的元素，则把它添加到队列的尾部

// 不停的有元素被删除，最终队列里只有一个元素，此时 while 循环终止，队列里剩下的元素就是最后一个被删除的元素