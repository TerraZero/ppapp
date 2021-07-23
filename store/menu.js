import API from '~/client/api/API';

const api = new API('/api');

export const state = () => ({
  current: null,
});

export const mutations = {
  async current(state, current) {
    state.current = current;
  }
}

export const actions = {
  async setCurrent(context, current) {
    context.commit('current', await api.searchMenuItem(current.path));
  }
}