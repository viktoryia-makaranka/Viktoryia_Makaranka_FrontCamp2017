import AppRoot from './appRoot';
import App from './components/App';

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/',
        exact: true,
        component: App
      }
    ]
  }
];

export default routes;