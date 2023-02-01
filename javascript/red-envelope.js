/**
 * 随机红包
 * @param {人数} num 
 * @param {总金额} amount 
 */

function Envelope(num, amount ) {
    let balance = amount;   // 余额
    let remainNum = num;    // 未抢人数
    const list = []; // 随机分配红包数组
    for(let i = num; i > 0; i-- ) {
        const average = Math.floor(balance / remainNum);
        let getAmount = (Math.random() * average * 2).toFixed(2);
        while(getAmount === 0) {
            getAmount = (Math.random() * average * 2).toFixed(2);
        }
        list.push( i === 1 ? +balance.toFixed(2) : +getAmount);
        remainNum--;
        balance -= getAmount;
    }
    console.log(list, list.reduce((a, b) => a + +b, 0))
    return list;
}

console.log(
    Envelope(10, 66)
);