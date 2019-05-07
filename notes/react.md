
## React

### 生命周期

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

### 组件通信

React 中数据流是单向的

- 父组件向子组件通过 props 传递数据
- 如果子组件向父组件通讯，Vue 可以通过 emit 事件且携带数据，React 还是需要父组件通过 props

### 条件渲染

内联式 if 的写法可能比较简洁：

```
{ this.state.randomBoolFlag && (<span>你可能会看到我（如果 randomBoolFlag 为真）</span>) }
```

### 循环渲染

这种写法会比较简洁，跟 Vue 一样，需要传入 key 属性：
```
{
  this.state.list.map((item) => (
    <li key={ item.key }>{ item.val }</li>
  ))
}
```

### 修饰组件样式

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

### slot

React 如果想实现 Vue 的 slot 功能，还是通过 props 传递 JSX.Element。它很容易就实现了等同于 Vue 的多 slot 功能：
```
// props 接收不同的属性，在不同的位置渲染出不同的 slot
<div>
  { this.props.renderHeader() }
  <p>This is your body element</p>
  { this.props.renderFooter() }
</div>
```

### 组件最外层的 div

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

### render prop

> 具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑

我觉得这句话（无论中文还是英文）很困惑，因为我看了官网给的例子。实际上它是指一个组件 prop 接收了一个 render 属性（当然不一定非得叫 render），这个属性是一个函数，返回的是 React 元素。那么这个组件渲染时会在合适的位置根据它渲染出 React 元素。要是我理解没错的话，它更像 Vue 里面的 slot 功能（原来我之前学 slot 的时候无意中用到的就是这个技术）。

### 组件调用事件处理函数

官网资料：https://zh-hans.reactjs.org/docs/faq-functions.html

- 在 constructor 中绑定：`this.handleClick = this.handleClick.bind(this)`
- 在组件定义 `handleClick = () => { xxx }`
- 在 render 中定义：`<button onClick={ this.handleClick.bind(this) }>Click Me</button>`（在 render 函数执行时会产生一个新的函数，可能影响性能）
- 在 render 中用箭头函数：`<button onClick={ () => this.handleClick() }>Click Me</button>`（在 render 函数执行时会产生一个新的函数，可能影响性能）

综上，第一种和第二种方法可能比较好。如果要我选的话，我可不太想在 constructor 中绑定，这样会增加代码量，所以我比较喜欢第二种。

### 何时会触发 render

- 初始化：组件被挂载的时候
- 执行 `setState` 的时候，不论 state 是否发生改变，该组件都重新渲染
- 父组件重新渲染了，子组件就会重新渲染

但是需要注意的是，以上情况不是绝对的，因为我们可以通过 `shouldComponentUpdate` 控制组件是否需要重新渲染。根据 [React 官网教程](https://react.docschina.org/docs/optimizing-performance.html)：
```
shouldComponentUpdate (nextProps, nextState) {
  if (this.props.color !== nextProps.color) {
    return true;
  }
  if (this.state.count !== nextState.count) {
    return true;
  }
  return false;
}
```
`shouldComponentUpdate` 可以获取到最新的 props 以及 state，我们可以定制某些状态更改时才重新渲染组件的方案，而不必每次 props, state 更改都重新渲染，造成性能损耗。以上的例子是想让组件只在 props.color 或者 state.count 的值变化时重新渲染。

Functional Component 如果 props 改变了，会重新渲染，但是无法像 Class Component 那样通过判断能避免重新渲染。

### Functional && Class Component

Functional component:
```
function Welcome (props) {
  return <h1>Hello, { props.name }</h1>;
}
```

Class component:
```
class Welcome extends React.Component {
  render () {
    return <h1>Hello, { this.props.name }</h1>
  }
}
```

因为 Functional Component 只是普通函数，它不能在里面使用 state, setState，所以它也被叫做无状态组件（现在 React 16 有了 hook 后这句话不成立）。而且它没有生命周期，因为所有生命周期钩子函数都来自 React.Componnent。

综上，何时使用 Functional Component:

- 不需要状态，生命周期时
- 代码量更少，容易阅读与测试
- 只接受父组件传来的 props，就可以完成表现层的功能

何时使用 Class Component:

- 当需要实现一些容器组件的时候，需要改变内部状态来实现自组件的改变的时候
- 需要用到生命周期钩子函数实现一些功能的时候
- 有些时候我们需要减少组件的渲染次数，我们就需要在组件内部用 `shouldComponentUpdate` 方法来去判断

### [高阶组件 (HOC)](https://reactjs.org/docs/higher-order-components.html)

> Whereas a component transforms props into UI, a higher-order component transforms a component into another component

首先，HighOrderComponent 不是 React 的某个 API，它是一种设计模式，为了解决某种问题：我们可能有多个组件，虽然它们具体业务处理不一样，但是行为模式可能有高度相似的地方：例如在组件挂载的时候，调用某个 API 获取数据，然后设置为自身的状态从而触发重新渲染。我们可以把这种行为模式抽象出来，例如可以写一个函数，函数接收两个参数：订阅数据的组件、数据源，它返回一个组件，组件定义了这些公共的行为模式，而这个组件 render 的是传入的订阅数据的组件，再给它数据源的 prop。所以这个函数，它完成的就是 transforms a component into another component。一个高阶组件，应该是一个纯函数，没有副作用。

### React Hook

根据官网介绍：

> Hooks let you use state and other React features without writing a class

以前有状态组件一般使用 Class Component，无状态组件使用 Functional Component，但现在 Functional Component 也可以通过 hook 设置状态了。只是为什么会推出这个新功能呢？

首先，如果想抽象可复用的行为或组件，我们可以通过 render prop (slot) 或者高阶组件 (HOC)，但需要重构组件，有时候这样反而增加复杂度。对此，hook 允许你从组件提取出这些 stateful logic（跟状态相关的逻辑），这样就变得可以独立测试与重用。Hooks allow you to reuse stateful logic without changing your component hierarchy。

另外，大型复杂的组件可能到处都是 stateful logic，但是我们却无法再分割成更小的组件，所以这也是为什么人们会使用状态管理库。但是这样经常增加复杂度，你可能需要查阅好几个文件才知道整个流程，可重用变得很困难。对此，hook 允许你把一个组件，基于相关联的部分（例如创建订阅或获取数据），分割成更小的函数。

还有，React 团队发现学习 React 的障碍之一是 class，你需要知道 JavaScript this 是如何工作的，你需要知道绑定事件等等。甚至 Functional Component 与 Class Component 的区别以及各自适用的情况，都会令有经验的人产生分歧。对此，hook 允许你不用依赖 class 而可以使用更多 React 的功能（Functional Component 是无状态的）。而现在的新版本，从概念上说，React 组件向 Functional Component 更接近了。

目前我了解过的 hooks 有：

#### State Hook

`useState`，它可以给 Functional Component 设置状态

执行时发生了啥？它会声明一个 **state** 变量，类似于 Class Component state。但是当函数执行完后，变量应该被垃圾回收的，但是这个会被 React 保留

传什么参数？它只需要一个参数，这个参数就是初始的状态值

返回什么？返回数组，包括当前状态值、以及用于更新状态值的函数，状态值类似于 this.state.xxx，函数则类似于 this.setState

```
const [ name, setName ] = useState('haisheng-lin');
```
这样子就是设置了初始状态 `{ name: 'haisheng-lin' }`，如果要更新这个属性，使用 `setName('new-name')` 就可以了。

#### Effect Hook

`useEffect`，你可能之前会在组件中获取 API 数据或者订阅，或者改变 dom，这些都是副作用 (side effects)，因为它们可能会影响其他组件，以及在渲染时无法完成。现在 `useEffect` 允许你从 Functional Component 完成这些功能，跟 Class Component 的 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 达到相同的目的。

执行时发生了啥？默认情况下，每一次 React 渲染（不管是第一次挂载还是更新）后都会执行这个函数。所以有时候执行一些逻辑，不管是组件刚挂载，还是更新后，我们希望每一次重新渲染后都执行，`useEffect` 将会派上用场。

在组件内执行这个函数，可以在函数内访问到组件的 state, props 等属性，方便进行一些操作。

每一次渲染后都会执行吗？是的，默认情况下。但是每一次都执行，有时候会浪费性能，所以我们可以自定义。只是目前来看，只有某些变量改变才会执行，这个限制条件有点狭窄：

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有 count 改变过，才会重新执行
```

函数返回什么？它可以选择性的返回一个函数，这个函数可以用于 clean up side effects（清理副作用）。那什么时候 clean up？之前说过，`useEffect` 在每一次渲染后执行，所以 clean up 也会发生在**上一次渲染和 running effects next time 之间**。

```
// 这个例子是 React 渲染 dom 之后改变文档的标题
// Similar to componentDidMount and componentDidUpdate:
useEffect(() => {
  // Update the document title using the browser API
  document.title = `You clicked ${ count } times`;
});
```

默认情况下，`useEffect` 会在每一次渲染（也包括第一次）之后被 React 执行，而且它还可以通过返回一个函数，达到清除资源（如订阅）的目的：

```
// 这个例子中，当组件 unmount 时候以及在重新渲染之前，ChatAPI 会被取消订阅
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

当然了，跟 `useState` 一样，`useEffect` 可以在组件内被使用多次。