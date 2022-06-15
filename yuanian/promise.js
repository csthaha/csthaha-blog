class _promise {
    constructor(excutor) {
        this.status = 'pending';        // promise 的状态
        this.value = undefined;         // promise 最终返回的值
        this.callBack = undefined;      // promise 执行的回调
        excutor(this.resolve, this.reject)
    }

    resolve = val => {
        this.value = val
        if(this.status === 'resolve') {
            this.callBack(val)
        }
    }

    then(cb) {
        this.callBack = cb
    }

    reject = err => {
        this.value = err
    }
}

const promise = new _promise((resolve, reject) => {
    console.log(1);
    resolve('success')
    console.log(2);
  });
  promise.then(() => {
    console.log(3);
  });
  console.log(4);
  
  
  

  