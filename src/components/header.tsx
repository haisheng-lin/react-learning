import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component<any> {

  toGamePage () {
    this.props.history.push({
      pathname: '/',
      query: 'game-component-query',
    });
  }

  render () {
    const aboutRoute = {
      pathname: '/about',
      query: 'my-query',
    };
    return (
      <nav>
        <ul>
          <li>
            <span style={{ cursor: 'pointer' }} onClick={ () => this.toGamePage() }>Game</span>
          </li>
          <li>
            <Link to={ aboutRoute }>About</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Header);
