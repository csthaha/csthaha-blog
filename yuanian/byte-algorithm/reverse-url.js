function reverseURL(url) {
    // 将字符串转换成数组进行操作
    const urlArr = url.split('');
  
    // 定义左右指针
    let left = 0, right = urlArr.length - 1;
  
    // 反转整个字符串
    while (left < right) {
      [urlArr[left], urlArr[right]] = [urlArr[right], urlArr[left]];
      left++;
      right--;
    }
    console.log(urlArr, '-===-');
    // 遍历字符串，交换每个子串中的字符
    left = 0;
    let dot = -1;
    while (left < urlArr.length) {
      if (urlArr[left] === '.') {
        // 遇到 "." 时，交换前面的子串
        reverseSubstring(urlArr, dot + 1, left - 1);
        // 更新 "." 的位置
        dot = left;
      }
      left++;
    }
    console.log('123', dot);
    // 处理最后一个子串
    reverseSubstring(urlArr, dot + 1, urlArr.length - 1);
  
    // 将数组转换回字符串并返回
    return urlArr.join('');
  }
  
  function reverseSubstring(arr, start, end) {
    // 反转子串
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  

  console.log(
    reverseURL("www.toutiao.com123")
  );


  "www.toutiao.com123".split('.')