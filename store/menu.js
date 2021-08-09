import System from '~/client/system';
import API from '~/client/api/API';

const api = API.create('/api');
const trigger = System.trigger();

export const state = () => ({
  current: null,
  route: null,
});

export const mutations = {
  route(state, route) {
    state.route = route;
  },

  current(state, current) {
    state.current = current;
  },
}

export const actions = {
  async setCurrent(context, current) {
    const item =  await api.searchMenuItem(current.path);

    context.commit('route', current);
    context.commit('current', item);
    await trigger('goto', item);
  },
}