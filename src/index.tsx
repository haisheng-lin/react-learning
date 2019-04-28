import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './assets/styles/global.less';

import Game from './components/game'; // 直接加载
const About = React.lazy(() => import('./components/about')); // 懒加载

class App extends React.Component {

  render () {
    const aboutRoute = {
      pathname: '/about',
      query: 'my-query',
    };
    return (
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <nav>
            <ul>
              <li>
                <Link to="/">Game</Link>
              </li>
              <li>
                <Link to={ aboutRoute }>About</Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/" component={ Game } />
          <Route path="/about" component={ About } />
        </React.Suspense>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
