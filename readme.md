### React 学习笔记

React 组件的 state 基本等同于 Vue 组件的 data, React 通过 `setState` 方法更改数据，Vue 则是通过 `this.xxx = xxx` 更改

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
- 如果子组件向父组件通讯，Vue 可以通过 emit 事件且携带数据，React 还是需要父组件通过 props 传递触发函数，子组件去调用函数来完成

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