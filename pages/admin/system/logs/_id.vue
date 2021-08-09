<template lang="pug">
  LayoutContainer.log(:type="type")
    template(#title)
      h1 {{ title }}
    .log__content
      LayoutContainer.log__message(small)
        template(#title)
          h2 Message
        .log__note(v-for="note of log.message") {{ note }}
      LayoutContainer.log__context(small)
        template(#title)
          h2 Context
        pre(v-html="context")
    
</template>

<script>
import System from '~/client/system';

const logger = System.logger('page');

export default {
  breadcrumb: async ({store, params}) => {
    const log = store.state.logs.logs.find(v => {
      return v.id === params.id;
    });
    return '[' + log.type.toUpperCase() + ']: ' + log.title;
  },
  layout: "admin",
  computed: {
    title() {
      return '[' + this.log.type.toUpperCase() + ']: ' + this.log.title;
    },

    context() {
      return JSON.stringify(this.log.context, null, '  ');
    },

    type() {
      return this.log.type;
    },
  },
  async asyncData({ params, store, redirect }) {
    const log = store.state.logs.logs.find(v => {
      return v.id === params.id;
    });
    
    if (log === undefined) {
      logger.warning('Log not found with id "' + params.id + '"');
      redirect(302, '/admin/system/logs');
    }

    store.commit('logs/see', log);
    console.log(log);
    return {
      log,
    };
  }
}
</script>

<style lang="sass">
.log

  &__content
    display: grid
    max-height: 80vh
    grid-template-columns: 1fr 1fr
    grid-gap: 5px

</style>
