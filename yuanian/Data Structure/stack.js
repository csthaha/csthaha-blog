// 栈 后进先出（LIFO）思想。基于数组、对象都可以实现一个栈

// 栈的应用：
// 1. 进制间的转化。
    // 十进制的数 20 转化为 二进制为  10100  =  16 + 0 + 4 + 0 + 0
    // 过程： 将余数进行入栈，入完之后。进行出栈 形成的结果就是二进制数字。
        // 20 / 2 = 10...0
        // 10 / 2 =  5...0
        //  5 / 2 =  2...1
        //  2 / 2 =  1...0
        //  1 / 2 =  0...1
    // 栈思想 后进先出： 10100
// 代码实现：

// stack 基于数组实现一个栈 基本功能。
class Stack {
    constructor() {
        this.list = []
    }

    push(ele) {
        this.list.push(ele)
    }

    pop() {
        return this.list.pop()
    }

    peek() {
        return this.list[this.list.length - 1];
    }

    isEmpty() {
        return this.list.length === 0;
    }

    clear() {
        this.list = [];
    }
    
    size() {
        return this.list.length;
    }
    
    print() {
        return this.list.toString()
    }
}

const decimalToBinary = num => {
    const stack = new Stack();
    let number = num;  // 商
    let remainder;  // 余数
    let binaryNumber = '';

    while(number > 0) {
        // 获取余叔
        remainder = Math.floor(number % 2);
        // 将余数入栈
        stack.push(remainder);
        // 获取最新结果
        number = Math.floor(number / 2)
    }

    while(!stack.isEmpty()) {
        // 出栈
        binaryNumber += stack.pop().toString()
    }

    return binaryNumber
}

console.log(decimalToBinary(20));    // 20 => 10100


// 十进制 转化为 任意进制（2～36）

const baseConverter = (decNumber, base) => {
    const stack = new Stack();
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    let number = decNumber;
    let remainder;
    let baseString = '';
    if(!(base >=2 && base <=36)) return;
    while(number > 0) {
        remainder = Math.floor(number % base);
        stack.push(remainder);
        number = Math.floor(number / base);
    }
    while(!stack.isEmpty()) {
        baseString += digits[stack.pop()];
    }
    return baseString;
}

console.log(baseConverter(100, 8));  // 八进制： 100  =>  144
// 100 / 8 = 12...4 
//  12 / 8 =  1...4
//   1 / 8 =  0...1
console.log(baseConverter(100, 35));  // 35进制： 100  =>  2u
//  100 / 35 = 2... 30(digits[30] = u)
//  2 / 35 = 0...2


// 应用2. 合法括号（成对出现的括号。）。

// sdf(ds(ew(we)rw)rwqq)qwewe   合法
// (sd(qwqw)sd(sd))	            合法
// ()()sd()(sd()fw))(		    不合法

//思路:  利用栈的思想。  遍历 遇到左括号就将其入栈，遇到右括号就弹出栈顶元素。最终判断栈是否为空。
function ValidBrackets(str) {
    const stack = new Stack();
    for(let s of str) {
        if(s === '(') {
            stack.push(s)
        }
        if(s === ')') {
            if(stack.isEmpty()) {
                return false;
            } 
            stack.pop()
        }
    }
    return stack.isEmpty()
}
console.log(
    ValidBrackets('()))))') // false
);
console.log(
    ValidBrackets('()()sd()(sd()fw))(') // false
);
console.log(
    ValidBrackets('(sd(qwqw)sd(sd))')   // true
);
console.log(
    ValidBrackets('sdf(ds(ew(we)rw)rwqq)qwewe') // true
);

// 应用3. 计算逆波兰表达式（后缀表达式。）
// ["4",	"13",	"5",	"/",	"+"]	等价于(4	+	(13	/	5))	=	6
// 思路：遍历数组将元素进行入栈操作。遇到 操作符（‘+’， ‘-’， ‘*’， ‘/’）则弹出两个元素。计算后
//       将结果进行入栈。如此计算。
// 最终栈中会有一个元素，其就是结果。

// 4. 中缀表达式转后缀表达式。