// 集合：
 // 集合是由一组无序且唯一（即不能重复）的项组成。

// 实现集合类：
// add(element)  向集合添加一个新元素
// delete(element)  从集合中移除一个元素
// has(element)  判断一个元素是否在集合中
// clear()  移除集合中的所有元素
// size()  返回集合中所包含元素的数量
// values()  返回一个包含集合中所有元素的数组
// isEmpty() 判断集合是否为空
// size()  返回集合中元素个数
// toString() 将集合中的元素以字符串形式输出

class _Set {
    constructor() {
        this.items = {}
    }

    add(ele) {
        if (!this.has(ele)) {
            this.items[ele] = ele;
          return true;
        }
        return false;
    }

    delete(ele) {
        if(this.has(ele)) {
            delete this.items[ele];
            return true;
        }

        return false;
    }

    has(ele) {
        return Object.prototype.hasOwnProperty.call(this.items, ele);
    }

    clear() {
        this.items = {}
    }

    size() {
        return Object.keys(this.items).length;
    }

    keys() {
        return Object.keys(this.items)
    }

    values() {
        return Object.values(this.items);
    }

    isEmpty() {
        return this.size() === 0;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const values = this.values();
        let objString = `${values[0]}`;
        for (let i = 1; i < values.length; i++) {
            objString = `${objString}, ${values[i].toString()}`;
        }
        return objString;
    }
}

// 集合的运算：并集、交集、差集

// 并集
/**
 * 
 * @param {Set} a 集合a
 * @param {Set} b 集合b
 * @returns 
 */
function union(a, b) {
    const unionSet = new _Set();
    [...a, ...b].forEach(item => {
        unionSet.add(item)
    })
    return unionSet
}

console.log(
    'unionSet: ',
    union([1,2,3], [1,3,4])
);

// 交集
function intersection(a, b) {
    const intersectionSet = new _Set();
    [...a].forEach(item => {
        if(b.indexOf(item) > -1) {
            intersectionSet.add(item)
        }
    })
    return intersectionSet
}
console.log(
    'intersectionSet: ',
    intersection([1,2,3], [1,3,4])
);

// 差集  a 相对于 b 的差集
function subTract(a, b) {
    const subTractSet = new _Set();
    [...a].forEach(item => {
        if(b.indexOf(item) === -1) {
            subTractSet.add(item)
        }
    })
    return subTractSet
}
console.log(
    'subTractSet: ',
    subTract([1,2,3], [1,3,4])
);