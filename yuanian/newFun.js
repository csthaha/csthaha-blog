
// const sum = new Function(...['a', 'b'], "return a + b")(...[1, 2])
// console.log(sum);

String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const values = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...values)
}

const html = template.innerHTML.interpolate({
    data: [
        {
            article: 'Article title one',
            author: 'y'
        }, 
        {
            article: 'Article title two',
            author: 'h'
        }
    ]
});

console.log(html);