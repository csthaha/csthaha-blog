/**
 * @param {number[]} arr
 * @param {number[][]} pieces
 * @return {boolean}
 */
 var canFormArray = function(arr, pieces) {
    let indexList = [];
  let res = true;
  const jugeAdd = arr => {
      if (arr.length === 1) return arr[0] >= 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] - arr[i - 1] !== 1) return false;
    }
    return true;
  };
  for (const list of pieces) {
    for (const item of list) {
      indexList.push(arr.indexOf(item));
    }
    res = jugeAdd(indexList);
    indexList = [];
    if (!res) break;
  }
  return res;
};