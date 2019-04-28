import * as React from 'react';
import { withRouter } from 'react-router-dom';

class RouterGuard extends React.Component<any> {

  componentWillMount (): void {
    // const { history, authorization, location } = this.props;
  }

  render (): JSX.Element {
    const { location, route } = this.props;
    const shouldRender = location.pathname === route.path;
    if (!shouldRender) {
      return null;
    }
    // 已经能获取到 route.component 了
    return (
      <React.Fragment>
        <route.component { ...this.props } />
      </React.Fragment>
    );
  }
}

export default withRouter(RouterGuard);
