import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/global.css';

import Game from './components/game.jsx';

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
