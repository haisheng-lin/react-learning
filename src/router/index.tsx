import renderRoutes from './render-routes';
import routes from './routes';

const createRouter = () => (
  renderRoutes({
    routes,
  })
);

export default createRouter;
