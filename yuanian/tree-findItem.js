// 一个树形的数据(如下数据)，面试官给你一个id，然后拿到对应的name?
// 目前项目经常用到这种

// 常用方法，递归解决

var cityData = [
    {
      id: 1,
      name: '广东省',
      children: [
        {
          id: 11,
          name: '深圳',
          children: [
            {
              id: 111,
              name: '宝安',
              children: [
                {
                  id: 1111,
                  name: '西乡',
                  children:[
                    {
                      id: 11111,
                      name: '坪洲',
                      children:[]
                    },
                    {
                      id: 11112,
                      name: '灵芝',
                      children:[]
                    }
                  ]
                },
                {
                  id: 1112,
                  name: '南山',
                  children:[
                    {
                      id: 11121,
                      name: '科技园',
                      children:[]
                    }
                  ]
                }
              ]
            },
            {
              id: 112,
              name: '福田',
              children: []
            }
          ]
        },
        {
          id: 12,
          name: '广州',
          children: [
            {
              id: 122,
              name: '白云区',
              children: [
                {
                  id: 1222,
                  name: '白云区',
                  children: []
                }
              ]
            },
            {
              id: 122,
              name: '珠海区',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: '湖南省',
      children: [
        {
            id: 12345,
            name: '广州2',
            children: [
              {
                id: 122345,
                name: '白云区2',
                children: [
                  {
                    id: 1222345,
                    name: '白云区3',
                    children: []
                  }
                ]
              },
              {
                id: 1256662,
                name: '珠海区2',
                children: []
              }
            ]
          }
      ]
    }
];

// 递归查找
console.time() 
function recursion(treeData, id) {
    if(!Array.isArray(treeData)) return
    for(let i = 0; i < treeData.length; i++) {
        if(treeData[i].id === id) {
            return treeData[i]
        }
        const children = treeData[i].children
        if(children && children.length) {
            return recursion(children, id);
        }
    }
    return null
}
console.timeEnd()
console.log('普通递归查找：', recursion(cityData, 1256662));

// 广度优先
console.time() 
function BFS(treeData, id) {
    if(!Array.isArray(treeData)) return
    let stack = [...treeData]
    while(stack.length) {
        const item = stack.shift()
        if(item.id === id) {
            return item
        }
        if(item.children && item.children.length) {
            stack = [...stack, ...item.children]
        }
    }
    return null
}

console.timeEnd()
console.log('广度优先查找：',BFS(cityData, 1256662));

// 深度优先
console.time() 
function DFS(treeData, id) {
    if(!Array.isArray(treeData)) return
    let stack = [...treeData]
    while(stack.length) {
        const item = stack.shift()
        if(item.id === id) {
            return item
        }
        if(item.children && item.children.length) {
            stack = [...item.children, ...stack]
        }
    }
}
console.timeEnd()
console.log('深度优先查找', DFS(cityData, 1256662));