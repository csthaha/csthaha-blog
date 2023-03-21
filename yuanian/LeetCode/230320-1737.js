/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var minCharacters = function(a, b) {
    const mapA = new Map();
    const mapB = new Map();
    for(let item of a) {
        mapA.set(
            item,
            1 + (mapA.get(item) || 0)
        )
    }
    for(let item of b) {
        mapB.set(
            item,
            1 + (mapB.get(item) || 0)
        )
    }
    console.log(
        mapA,
        mapB
    );
};

console.log(
    minCharacters("aba", "caa")
);