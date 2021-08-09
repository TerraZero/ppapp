export const state = () => ({
  current: null,
  route: null,
});

export const actions = {
  async nuxtServerInit(...args) {
    console.log(args);
  }
}