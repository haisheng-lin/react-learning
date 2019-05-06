## React-Router

### 路由传参

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

### 通过 js 跳转路由

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

### 路由守卫

已经实现了 RouterGuard，只需要再加一个守卫函数即可。

### Webpack publicPath 与 react-router

如果设置了 publicPath 例如 '/public'，那么输入地址 `localhost:8000/public` 是无法匹配路由的。解决办法是在 `Router` 组件传入一个 `basename` 属性，填上与 publicPath 相对应的值即可（但是我觉得这样还是有耦合）。