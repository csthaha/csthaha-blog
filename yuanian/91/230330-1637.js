/**
 * @param {number[][]} points
 * @return {number}
 */
var maxWidthOfVerticalArea = function(points) {
    if(points.length === 0) return 0;
    points.sort((a, b) => a[0] - b[0]);
    console.log(points, '---');
    let width = 0;
    for(let i = 1; i < points.length; i++) {
        let cur = points[i][0] - points[i - 1][0];
        if(cur > width) {
            width = cur;
        } 
    }
    return width;
};

console.log(
    maxWidthOfVerticalArea([[8,7],[9,9],[7,4],[9,7]])
);