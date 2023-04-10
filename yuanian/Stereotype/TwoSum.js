var AddTwoSum = function(a, b) {
    // 大数相加
    let carry = 0;
    let result = "";
  
    let p1 = a.length - 1;
    let p2 = b.length - 1;
  
    while (p1 >= 0 || p2 >= 0) {
      const x1 = p1 >= 0 ? parseInt(a[p1], 10) : 0;
      const x2 = p2 >= 0 ? parseInt(b[p2], 10) : 0;
  
      const tempSum = x1 + x2 + carry;
      carry = Math.floor(tempSum / 10);
      result = (tempSum % 10) + result;
  
      p1--;
      p2--;
    }
  
    if (carry > 0) {
      result = carry + result;
    }
  
    return result;
  };
  
  // 比较两个正数字符串，如果 a > b 返回 1，a < b 返回 -1，a === b 返回 0
  function comparePositiveStrings(a, b) {
    if (a.length > b.length) {
      return 1;
    } else if (a.length < b.length) {
      return -1;
    }
  
    for (let i = 0; i < a.length; i++) {
      if (a[i] > b[i]) {
        return 1;
      } else if (a[i] < b[i]) {
        return -1;
      }
    }
  
    return 0;
  }
  
  var ReduceSum = function(str1, str2) {
    const arr1 = str1.split("").reverse();
    const arr2 = str2.split("").reverse();
    const ans = [];
    let jw = false;
    for (let i = 0; i < arr1.length; i++) {
      let diff = 0;
      const a = arr1[i] - (jw ? 1 : 0);
      const b = arr2[i] || 0;
      if (a >= b) {
        jw = false;
        diff = a - b;
      } else {
        jw = true;
        diff = a + 10 - b;
      }
      ans.push(diff);j
    }
    return ans
      .reverse()
      .join("")
      .replace(/^0+/, "");
  };
  
  var twoSum = function(str1, str2) {
    if (str1 >= 0 && str2 >= 0) {
      return AddTwoSum(str1, str2);
    }
    if (str1 < 0 && str2 < 0) {
      const sum = AddTwoSum(str1.slice(1), str2.slice(1));
      return `-${sum}`;
    }
    if (str1 < 0) {
      // 就是说 str2 - str1
      // 够不够减？
      const s1 = str1.slice(1);
      const s2 = str2;
      const flag = comparePositiveStrings(s1, s2);
      if (flag === 1) {
        // 说明不够贱
        const sum = ReduceSum(s1, s2);
        return `-${sum}`;
      } else {
        return ReduceSum(s2, s1);
      }
    }
    if (str2 < 0) {
      // 就是说 str2 - str1
      // 够不够减？
      const s1 = str1;
      const s2 = str2.slice(1);
      const flag = comparePositiveStrings(s1, s2);
      if (flag === 1) {
        return ReduceSum(s1, s2);
      } else {
        return `-${ReduceSum(s2, s1)}`;
      }
    }
  };
  
  console.log(twoSum("123", "-1241234534334789"));
  console.log(twoSum("-124", "123"));
  console.log(twoSum("123", "-23"));
  console.log(twoSum("-123", "23"));
  console.log(twoSum("123456789", "123456789"));