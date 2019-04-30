import * as React from 'react';

import createRouter from './router';

class App extends React.Component {

  render () {
    return createRouter();
  }
}

export default App;
