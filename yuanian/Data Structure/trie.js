// 前缀树：
//     也称字典书、Trie树，是一种数据结构，用于高效地存储和检索字符。它是一种类似树的结构，由于根节点和一系列子节点
//     组成，其中每个子节点表示字符串中的一个字符。前缀树的结构可以快速地搜素和检索数据，因此在自动完成和拼写检查等任务
//     中非常有用。前缀树常被用于文本编辑器、编译器、搜索引擎。


// 构建前缀树的基本思路是将每个字符串拆分成一个个字符，然后将字符按照顺序挂在树形结构的节点上。
// 在JavaScript中，可以使用对象来表示前缀树的节点，其中每个属性表示一个字符，属性值为该字符节点的子节点对象。

// 以下是一个示例代码，实现了向前缀树中添加字符串、查询字符串是否存在的功能：

class TrieNode {
    constructor() {
        this.children = {}; // 子节点对象
        this.isEndOfWord = false; // 标记当前节点是否是某个字符串的结尾
    }
}
  
class Trie {
    constructor() {
        this.root = new TrieNode(); // 前缀树的根节点
    }
  
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children[char]) {
                // 如果当前节点不存在该字符的子节点，则创建一个新节点
                node.children[char] = new TrieNode();
            }
            node = node.children[char]; // 移动到该字符的子节点
        }
        node.isEndOfWord = true; // 在字符串结尾的节点上打标记
    }
  
    search(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children[char]) {
                // 当前节点没有该字符的子节点，说明该字符串不存在于前缀树中
                return false;
            }
            node = node.children[char]; // 移动到该字符的子节点
        }
        // 如果最后节点上打了结尾标记，则说明该字符串已存在
        return node.isEndOfWord;
    }
}
  