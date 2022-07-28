import { forEachFn } from "./utils";

export default class ModuleCollection {
    constructor(opation) {
        // 生成如下结构模块 根模块/内容
        this.generateModlue([], opation)
    }
    generateModlue(path, rootModule) {
        // 根模块
        let newModule = {
            _raw: rootModule,
            _children: {},
            _state: rootModule.state
        }

        if(path.length === 0) {
            this.root = newModule;
        } else {
            // 如果不是 根模块 那么需要 把该模块放在父模块的_children 中
            // 利用 reduce api 获取到当前模块的父模块。 取出当前模块前的所有模块路径，
            // 然后将父模块放到 挂到 爷模块的 _children 下
            let parentModule = path.slice(0, -1).reduce((rootM, cur) => {
                return rootM._children[cur]
            }, this.root)
            parentModule._children[path[path.length - 1]] = newModule
        }
        if(rootModule.modules) {
            // 遍历所有子模块
            forEachFn( rootModule.modules, (module, moduleName) => {
                this.generateModlue([...path, moduleName], module)
            })
        }
    }
}

// 格式化树 成下面结构
// 根模块
// this._root = {
//     _raw: '模块1', // 各个模块
//     _children: {
//         _raw: '模块1-1',
//         _children: {
//             _raw: '模块1-1-1'
//         },
//         state: '模块1-1的state'
//     },  // 各个模块下的子模块
//     state: '模块1的state'  // 方便后续取值
// }