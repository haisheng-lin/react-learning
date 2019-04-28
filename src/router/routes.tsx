import Game from '@/components/game';
import About from '@/components/about';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Game,
  },
  {
    path: '/about',
    component: About,
  },
];

export default routes;
