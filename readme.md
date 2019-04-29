## React 学习笔记

React 组件的 state 基本等同于 Vue 组件的 data, React 通过 `setState` 方法更改数据，Vue 则是通过 `this.xxx = xxx` 更改

### React 本身

#### 生命周期

当组件在客户端（浏览器）被实例化，第一次被创建时，以下方法依次被调用：

- `getDefaultProps`: 只调用一次，顾名思义，设置组件默认的 props 数据
- `getInitialState`: 只调用一次，顾名思义，初始化组件的 state 数据
- `componentWillMount`: 类似 Vue 的 `beforeMount`
- `render`: 创建一个虚拟 DOM，用来表示组件的输出，Vue 也有这方法
- `componentDidMount`: 渲染出真实的 DOM 后调用，类似 Vue 的 `mounted`

当组件已经渲染好并且用户可以与它进行交互，比如鼠标点击，手指点按，或者其它的一些事件，导致应用状态的改变，你将会看到下面的方法依次被调用：

- `componentWillReceiveProps`: 组件的 props 属性可以通过父组件来更改，这时，componentWillReceiveProps 将来被调用。可以在这个方法里更新 state,以触发 `render` 方法重新渲染组件
- `shouldComponentUpdate`: 如果你确定组件的 props 或 state 的变更不需要重新渲染，可以通过这函数返回 **false** 来阻止重新渲染，如果返回 **false** 那么不会执行后续的 `render`, `componentWillUpdate`, `componentDidUpdate`
- `componentWillUpdate`: 类似于 Vue 的 `beforeUpdate`
- `componentDidUpdate`: 类似于 Vue 的 `updated`

当组件销毁时：

- `componentWillUnmount`: 类似于 Vue 的 `beforeDestroy`

#### 组件通信

React 中数据流是单向的

- 父组件向子组件通过 props 传递数据
- 如果子组件向父组件通讯，Vue 可以通过 emit 事件且携带数据，React 还是需要父组件通过 props

#### 条件渲染

内联式 if 的写法可能比较简洁：

```
{ this.state.randomBoolFlag && (<span>你可能会看到我（如果 randomBoolFlag 为真）</span>) }
```

#### 循环渲染

这种写法会比较简洁，跟 Vue 一样，需要传入 key 属性：
```
{
  this.state.list.map((item) => (
    <li key={ item.key }>{ item.val }</li>
  ))
}
```

#### 修饰组件样式

第一种是通过 style 编写内联样式，但是这么写我个人不太喜欢，也不太好维护：
```
<div style={{ background: green }}>test</div>
```

第二种是编写样式文件，在组件文件导入进来，注意 jsx 中赋值类不是通过 `class=xxx` 而是 `className=xxx`：
```
// 这是组件文件 square.tsx
import '../assets/styles/square.less';

render () {
  return (
    <div className='your-class'></div>
  );
}
```

#### slot

React 如果想实现 Vue 的 slot 功能，还是通过 props 传递 JSX.Element

#### 组件最外层的 div

就像 Vue 一样，React 的组件最外层需要一个 `div` 标签包裹起来，不允许最外层有两个或以上同级的元素。例如：
```
<div>
  <div>test</div>
  <span>test</span>
</div>
```

但是如果我们希望渲染的时候，只显示组件真正的模板，不要最外层的 `div`，那可以把最外层的 `div` 替换为 `React.Fragment`：
```
<React.Fragment>
  <div>test</div>
  <span>test</span>
</React.Fragment>
```

### React-Router

#### 路由传参

1. 通配符传参

Route 定义方式：
```
<Route path='/path/:name' component={ Path }/>
```

Link 组件：
```
<Link to="/path/通过通配符传参">通配符</Link>
```

参数获取：
```
this.props.match.params.name
```

- 优点：简单快捷,并且，在刷新页面的时候，参数不会丢失
- 缺点：只能传字符串，并且，如果传的值太多的话，url 会变得长而丑陋

2. query

Route 定义方式：
```
<Route path='/query' component={ Query }/>
```

Link 组件：
```
const query = {
  pathname: '/query',
  query: 'oops!',
};
<Link to={ query }>query</Link>
```

参数获取：
```
this.props.location.query // oops!
```

- 优点：优雅，可传对象
- 缺点：刷新页面，参数丢失


3. 通过 js 实现的路由跳转如何传递参数？

看下文。

#### 通过 js 跳转路由

第一步，从 `react-router-dom` 导入 `withRouter` 方法：
```
import { withRouter } from 'react-router-dom';
```

第二步，使用 `withRouter` 方法加工需要触发路由跳转的组件（具体可看 `header.tsx`）：
```
export default withRouter(Header);
```

第三步，通过 `this.props.history.push` 实现路由跳转，也可以写成一个函数：
```
<span onClick={ () => this.props.history.push('/') }>Game</span>
```

如何传参？改成：
```
toGamePage () {
  this.props.history.push({
    pathname: '/',
    query: 'my-query',
  });
}

...

<span onClick={ () => this.toGamePage() }>Game</span>
```

参数获取：
```
this.props.location.query // my-query
```

#### 路由守卫

已经实现了 RouterGuard，只需要再加一个守卫函数即可。

### Redux

就像 Vue 一样，React 本身没有状态管理功能，所以需要其他状态管理库来完成。Redux 就是其中一款实现了 Flux 的库。

#### 基本概念

- `state`: React 组件通过状态变更而触发 UI 的改变，跟 Vue data 差不多，没啥好说的
- `action`: 如果想改变状态，你需要派发一个 action，一个 action 其实是一个 JS 对象，它描述了这个行为里发生了什么（状态发生什么改变）
- `reducer`: reducer 是一个纯函数，它接收 state 以及 action，然后返回下一个状态。

所以我的理解就是，state 是数据源，action 是行为，而 reducer 像是一个操作者，对数据源根据行为进行操作。

#### 流程

以我之前的 [React 项目](https://github.com/haisheng-lin/emaily-server/tree/master/client) 为例：

- 在 `SurveyList` 组件挂载后马上派发一个 `fetchSurveys` action
- 每个 reducer 都会监听 action，如果 action 的 type 与自己监听的 type 一致，那么将会返回新的数据状态，所以在 `surveyReducer` 中数据变成了 `action.payload`，否则还是返回原来的数据。当然，这里的逻辑都是我写的，也可以返回其他东西
- 所有 reducer 都由一个总的 `combineReducers` 管理，所有 reducer 的响应都交给 `combineReducer`，存放在一个对象中
- `SurveyList` 通过 `mapStateToProps` 从第三步中说的对象获取数据，map 到自己的 props，那么就拿到新的状态了