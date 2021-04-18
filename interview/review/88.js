
 var merge = function(nums1, nums2) {
    var res = [];
    while(nums1.length && nums2.length) {
        var a = nums1[0],  
            b = nums2[0]
        
        if(a > b) {
            res.push(nums2.shift())
        } else {
            res.push(nums1.shift())
        }
    }

    if(nums2.length !== 0) {
        res.push(...nums2)
    }

    if(nums1.length !== 0) {
        res.push(...nums1)
    }

    return res;
};

console.log(merge([1,2,3,8],[4,5,6]))