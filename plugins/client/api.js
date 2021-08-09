import System from '~/client/system';

export default function(context) {
  console.log(context);
  System.context = context;

  context.app.router.afterEach((to, from) => {
    if (context.store) context.store.dispatch('menu/setCurrent', to);
  });
};