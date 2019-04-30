import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RouterGuard from './router-guard';

const renderRoutes = (data: { routes: RouteConfig[] }) => (
  <Router basename="/public">
    <Switch>
    {
      data.routes.map((route, index) => {
        return (
          <Route
            key={ index }
            path={ route.path }
            exact
            render={ props => (
              <RouterGuard route={ route } { ...props } />
            )}
          />
        );
      })
    }
    </Switch>
  </Router>
);

export default renderRoutes;
