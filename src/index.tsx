import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './assets/styles/global.css';

import Game from './components/game';

class App extends React.Component {

  render () {
    return (
      <Game />
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
