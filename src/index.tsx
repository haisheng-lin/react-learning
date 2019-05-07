import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'unstated';

// import { Provider } from 'mobx-react';

import './assets/styles/global.less';

import App from './app';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>
  ,
  document.querySelector('#root'),
);
