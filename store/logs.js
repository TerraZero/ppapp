import { v4 } from 'uuid';

export const state = () => ({
  logs: [],
});

export const mutations = {
  add(state, log) {
    log.id = v4();
    state.logs.push(log);
  },

  see(state, log) {
    log.isNew = false;
  },
}

export const actions = {
  add(context, log) {
    context.commit('add', log);
  },
}