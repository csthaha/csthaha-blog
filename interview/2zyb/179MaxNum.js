// function maxNum(arr) {
//     const comparator = (a, b) => (a + b) > (b + a) ? -1 : (a + b) < (b + a) ? 1 : 0
//     const sort = arr.sort((a, b) => comparator(String(a), String(b))).join('')
//     return sort[0] == 0 ? 0 : sort
// }

// console.log(maxNum([10, 2]))

// 女孩子
class Girl {
    faceValue() {
      console.log('我原本的脸')
    }
  }
  
  class ThinFace  {
    constructor(girl) {
      this.girl = girl;
    }
    faceValue() {
      this.girl.faceValue();
      console.log('开启瘦脸')
    }
  }
  
  class IncreasingEyes  {
    constructor(girl) {
      this.girl = girl;
    }
    faceValue() {
      this.girl.faceValue();
      console.log('增大眼睛')
    }
  }
  
  let girl = new Girl();
  girl = new ThinFace(girl);
  girl = new IncreasingEyes(girl);
  
  // 闪瞎你的眼
  girl.faceValue(); // 