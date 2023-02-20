/**
 * @param {CustomFunction} customfunction
 * @param {integer} z
 * @return {integer[][]}
 */
/**
 * // This is the CustomFunction's API interface.
 * // You should not implement it, or speculate about its implementation
 * function CustomFunction() {
 *     @param {integer, integer} x, y
 *     @return {integer}
 *     this.f = function(x, y) {
 *         ...
 *     };
 * };
 */

/**
 * @param {CustomFunction} customfunction
 * @param {integer} z
 * @return {integer[][]}
 */
 var findSolution = function(customfunction, z) {
    const list = []
    const help = (x, y) => {
        if(customfunction.f(x, y) > z || list.indexOf(`${x}.${y}`) != -1) {
            return;
        }
        if(customfunction.f(x, y) === z && list.indexOf(`${x}.${y}`) === -1) {
            list.push(`${x}.${y}`)
            return;
        }
        help(x + 1, y);
        help(x , y + 1);
    }
    help(1, 1);
    return list.map(item => item.split('.').map(item => +item));
};

// 改方法超市

var findSolution = function(customfunction, z) {
    let x = 1,
        y = 1
    const list = [];
    while(x <= 1000 && y <= 1000 && customfunction.f(x, y) <= z) {
        if(customfunction.f(x, y) === z) {
            list.push([x, y]);
        } else {

        }
    }
}