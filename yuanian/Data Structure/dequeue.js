//   双端队列
//  双端队列是一种允许我们同事从两端进行入队和出队。
//    双端队列同事遵循了 先进先出 和 后进先出的原则，因此可以说它是 栈和队列 相结合的一种数据结构。

// 基于数组的双端队列

// addFront(element)  在双端队列的前端添加新的元素
// addBack(element)  在双端队列的后端添加新的元素  
// removeFront()  从双端队列的前端移除第一个元素
// removeBack()  从双端队列的后移除除第一个元素
// peekFront()  返回双端队列 前端的第一个元素（注意：只是查看，不是删除）
// peekBack()  返回双端队列 后端的第一个元素（注意：只是查看，不是删除）
// isEmpty()  判断双端队列是否为空
// clear()  清空双端队列中的元素
// size()  返回双端队列中的元素个数
// toString() 输出双端队列的字符形式

class Dequeue {
    constructor() {
        this.items = []
    }

    addFront(ele) {
        this.items.unshift(ele);
    }

    addBack(ele) {
        this.items.push(ele)
    }

    removeFront() {
        if(this.isEmpty()) return undefined;
        return this.items.shift()
    }

    removeBack() {
        if(this.isEmpty()) return undefined;
        return this.items.pop();
    }

    peekFront() {
        if(this.isEmpty()) return undefined;
        return this.items[0]
    }

    peekBack() {
        if(this.isEmpty()) return undefined;
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        return this.items.length === 0
    }

    clear() {
        this.items = []
    }

    size() {
        return this.items.length
    }

    toString() {
        if (this.isEmpty()) {
          return '';
      }
      return this.items.toString();
    }
}

// 双端队列的应用

// 回文检查器
// 回文是正反都能读通的单词、词组、数或句子，例如数字：11、131，单词：level、reviver。

// 有不同的算法可以检查一个词组或字符串是否为回文，
// 最简单的方式是将字符串反向排列并检查它和原字符串是否相同，如果两者相同，那么它就是一个回文。
// 我们也可以用栈来实现。
// 但是利用数据结构来解决这个问题的最简单方法是使用双端队列。

// str.charAt(index)  从一个字符串中返回指定的字符。

// 思路：
// 将字符串放入双端队列中，然后同时从队列的前端 和 队列的尾端 同时移出一个字符进行比较。如果相同继续比较。
// 如果不同返回 false。直到比较到剩余最有一个字符。则这个字符串是一个回文字符串。