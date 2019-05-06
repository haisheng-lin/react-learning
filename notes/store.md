## Redux

就像 Vue 一样，React 本身没有状态管理功能，所以需要其他状态管理库来完成。Redux 就是其中一款实现了 Flux 的库。

### 基本概念

- `state`: React 组件通过状态变更而触发 UI 的改变，跟 Vue data 差不多，没啥好说的
- `action`: 如果想改变状态，你需要派发一个 action，一个 action 其实是一个 JS 对象，它描述了这个行为里发生了什么（状态发生什么改变）
- `reducer`: reducer 是一个纯函数，它接收 state 以及 action，然后返回下一个状态。

所以我的理解就是，state 是数据源，action 是行为，而 reducer 像是一个操作者，对数据源根据行为进行操作。

### 流程

以我之前的 [React 项目](https://github.com/haisheng-lin/emaily-server/tree/master/client) 为例：

- 在 `SurveyList` 组件挂载后马上派发一个 `fetchSurveys` action
- 每个 reducer 都会监听 action，如果 action 的 type 与自己监听的 type 一致，那么将会返回新的数据状态，所以在 `surveyReducer` 中数据变成了 `action.payload`，否则还是返回原来的数据。当然，这里的逻辑都是我写的，也可以返回其他东西
- 所有 reducer 都由一个总的 `combineReducers` 管理，所有 reducer 的响应都交给 `combineReducer`，存放在一个对象中
- `SurveyList` 通过 `mapStateToProps` 从第三步中说的对象获取数据，map 到自己的 props，那么就拿到新的状态了

### mobx

除了 redux 外，mobx 也是一款状态管理库。相比 redux，mobx 需要写的代码更简洁，学习成本低一些，不过有可能会出现不规范的问题。你只需要安装 mobx, mobx-react 这两个库。如果你还想用装饰器语法，那么按照以下配置：

安装 babel-plugin-transform-decorators-legacy, babel-preset-stage-1 这两个库，然后在 `.babelrc` 里：
```
// .babelrc
{
  "presets": [
    "stage-1",
    "react",
    "env"
  ],
  "plugins": [
    // 必须放第一位
    "transform-decorators-legacy"
  ]
}
```

为什么说可能不规范？因为实际上你也可以通过直接修改 state 达到目的，而不是通过 action。redux 虽然流程繁琐，但是规范，对团队协作起了很好的作用。