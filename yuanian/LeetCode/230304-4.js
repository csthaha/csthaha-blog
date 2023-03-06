/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const res = []
    while(nums1.length && nums2.length) {
        res.push(
            nums1[0] > nums2[0] ? nums2.shift() : nums1.shift()
        )
    }
    res.push(...nums1, ...nums2)
    return res;
};

console.log(
    findMedianSortedArrays(
        [1, 3],
        [2]
    )
);