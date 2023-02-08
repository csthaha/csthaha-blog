/**
 * @param {string[]} folder
 * @return {string[]}
 */

//  输入：folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
//  输出：["/a","/c/d","/c/f"]
//  解释："/a/b" 是 "/a" 的子文件夹，而 "/c/d/e" 是 "/c/d" 的子文件夹。

// 提交记录：https://leetcode.cn/problems/remove-sub-folders-from-the-filesystem/submissions/

var removeSubfolders = function(folder) {
    // let res = [...folder]
    let sortFolder = folder.sort((a, b) => a.length - b.length);
    for(let folder of sortFolder) {
        const regExp = new RegExp(`^${folder}/.`)
        sortFolder = sortFolder.filter(item => !regExp.test(item))
    }
    return sortFolder;
};

console.log(
    removeSubfolders(["/a","/a/b","/c/d","/c/d/e","/c/f"])
);
console.log(
    removeSubfolders(["/a","/a/b/c","/a/b/d"])
);
console.log(
    removeSubfolders(["/a/b/c","/a/b/ca","/a/b/d"])
);
console.log(
    removeSubfolders(["/c","/d/c/e"])
);