/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
var alertNames = function(keyName, keyTime) {
    const isRangeOne = (time1, time2) => {
        const arr1 = time1.split(':');
        const arr2 = time2.split(':');
        if(+arr2[0] === +arr1[0] && +arr2[1] >= +arr1[1]) return true;
        if(+arr2[0] - 1 === +arr1[0] && arr2[1] <= arr1[1]) return true;
        return false
    }
    const meetCondition = (timeList, num) => {
        if(timeList.length < num) return false;
        const sortTime = timeList.sort()
        let bool = false;
        for(let i = (num - 1); i < sortTime.length; i++) {
            if(
                isRangeOne(sortTime[i - (num - 1)], sortTime[i])
            ) {
                bool = true;
                break;
            }
        }
        return bool;
    }

    // 名称时间进行映射。
    const nameMapTime = {}
    for(let i = 0; i < keyName.length; i++) {
        if(!nameMapTime[keyName[i]]) {
            nameMapTime[keyName[i]] = [keyTime[i]]
        } else {
            nameMapTime[keyName[i]].push(keyTime[i])
        }
    }
    const res = []
    Object.keys(nameMapTime).forEach(key => {
        if(
            meetCondition(nameMapTime[key], 3)
        ) {
            res.push(key)
        }
    })
    return res.sort()
};

console.log(
    alertNames(
        ["daniel","daniel","daniel","luis","luis","luis","luis"], 
        ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]
    )
);
console.log(
    alertNames(
        ["alice","alice","alice","bob","bob","bob","bob"], 
        ["12:01","12:00","18:00","21:00","21:20","21:30","23:00"]
    )
);
console.log(
    alertNames(
        ["john","john","john"], 
        ["23:58","23:59","00:01"]
    )
);
console.log(
    alertNames(
        ["leslie","leslie","leslie","clare","clare","clare","clare"], 
        ["13:00","13:20","14:00","18:00","18:51","19:30","19:49"]
    )
);
console.log(
    alertNames(
        ["a","a","a","a","a","a","b","b","b","b","b"], 
        ["23:27","03:14","12:57","13:35","13:18","21:58","22:39","10:49","19:37","14:14","10:41"]
    )
);