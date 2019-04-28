import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './assets/styles/global.less';

import createRouter from './router';

class App extends React.Component {

  render () {
    return createRouter();
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
