import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import appState from './store/app-state';

import './assets/styles/global.less';

import App from './app';

ReactDOM.render(
  <Provider appState={ appState }>
    <App />
  </Provider>
  ,
  document.querySelector('#root'),
);
