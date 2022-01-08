import System from '~/client/system';
import Session from '~/client/session';

export default function(context) {
  console.log('plugins/client/api', context);
  System.context = context;
  Session.setCookieAPI(context.$cookies);

  context.app.router.afterEach((to, from) => {
    if (context.store) context.store.dispatch('menu/setCurrent', to);
  });
};