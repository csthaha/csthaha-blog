/**
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表
 * 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
 * @param {string[]} strs
 * @return {string[][]}
 * 
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * 输入: strs = [""]
 * 输出: [[""]]
 * 
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 */
var groupAnagrams = function(strs) {
    // 解法一
    // 给你一个字符串 生成所有的 字母已为此（全排列。）可能存在同字母。 然后可以进行找出相同的。

    // 解法二：
    let arr = [...strs];
    arr = arr.map(item => item.split('').sort().join(''));
    const map = {};
    for(let i = 0; i < arr.length; i++) {
        if(!map[arr[i]]) {
            map[arr[i]] = [strs[i]]
        } else {
            map[arr[i]].push(strs[i])
        }
    }
    return Object.values(map)
};

console.log(
    groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
);

console.log(
    groupAnagrams([""])
);
console.log(
    groupAnagrams(["a"])
);