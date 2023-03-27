/**
 * @param {number[]} temperatureA
 * @param {number[]} temperatureB
 * @return {number}
 */
var temperatureTrend = function(temperatureA, temperatureB) {
    let ans = 0;
    let trendA = [];
    let trendB = []
    for(let i = 1; i < temperatureA.length; i++) {
        trendA.push(
            temperatureA[i] > temperatureA[i - 1] ? 1 : 
                (temperatureA[i] < temperatureA[i - 1] ? -1 : 0)
        )
        trendB.push(
            temperatureB[i] > temperatureB[i - 1] ? 1 : 
                (temperatureB[i] < temperatureB[i - 1] ? -1 : 0)
        )
    }

    let same = 0;
    for(let i = 0; trendA.length; i++) {
        if(trendA[i] === trendB[i]) {
            same += 1;
            ans = Math.max(same, ans)
        } else {
            same = 0;
        }
    }

    return ans;
};