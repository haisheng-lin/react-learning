import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './assets/styles/global.less';

import Header from './components/header'; // 直接加载
import Game from './components/game'; // 直接加载
const About = React.lazy(() => import('./components/about')); // 懒加载

class App extends React.Component {

  render () {
    return (
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Header />
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
