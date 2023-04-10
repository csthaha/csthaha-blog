/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
    let bob = 0;
    var aliceCount = function(p) {
        if(piles.length === 2) {
            return Math.max(
                piles[0],
                piles[1]
            )
        }
        let alice = p[0] > p[p.length - 1] ? p.shift() : p.pop();
        p[0] > p[p.length - 1] ? (bob + p.shift()) : (bob + p.pop());
        return alice + aliceCount(p)
    }
    let ans = aliceCount(piles);
    console.log(ans, bob);
    return ans > bob

};

console.log(stoneGame([3,2,10, 4]));