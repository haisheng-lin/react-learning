import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './assets/styles/global.less';

import Game from './components/game';
import About from './components/about';

class App extends React.Component {

  render () {
    const aboutRoute = {
      pathname: '/about',
      query: 'my-query',
    };
    return (
      <Router>
        <div>
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
        </div>
        <div>
          <Route exact path="/" component={ Game } />
          <Route path="/about" component={ About } />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
