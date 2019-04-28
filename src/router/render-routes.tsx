import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RouterGuard from './router-guard';

const renderRoutes = (data: { routes: RouteConfig[] }) => (
  <Router>
    {
      data.routes.map((route, index) => {
        return (
          <Route
            key={ index }
            path={ route.path }
            render={ props => (
              <RouterGuard route={ route } { ...props } />
            )}
          />
        );
      })
    }
  </Router>
);

export default renderRoutes;
