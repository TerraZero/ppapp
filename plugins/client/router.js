import API from '~/client/api/API';

export default function({app, store}) {
  API.router = app.router;
  app.router.afterEach((to, from) => {
    if (store) store.dispatch('menu/setCurrent', to);
  });
};