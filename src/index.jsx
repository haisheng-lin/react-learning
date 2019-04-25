import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  handleClick () {
    console.log('hehe');
  }
  render () {
    return (
      <h1 onClick={this.handleClick}>Hello React!</h1>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
