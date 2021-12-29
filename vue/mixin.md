### mixin
- 用来分发 vue 组件中的可复用功能
> 一个混入对象可以包含任意组件选项，当组件使用混入对象时，所有混入对象的选项被 混合 进入该组件本身的选项

- 选项合并：
    > 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行 合并
    - 数据对象在内部会进行合并，并在发生冲突（同名）时以组件数据优先。
    - 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
    - 值为对象的选项，例如：methods、components、directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的建值对。

- 全剧混入。混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。

- 自定义选项合并
> 自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 Vue.config.optionMergeStrategies 添加一个函数：
```javascript
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```
对于多数值为对象的选项，可以使用与 methods 相同的合并策略：
```javascript
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```