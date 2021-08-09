<template lang="pug">
  .menu-actions
    .menu-actions__action(v-for="action of actions")
      FormButton(v-if="action.config.icon", :type="action.config.category || 'primary'", :icon="action.config.icon", :text="action.title", @click.native="handle(action)")
      el-button(v-else, :type="action.config.category || 'primary'", :icon="action.config.icon", @click.native="handle(action)") {{ action.title }}

</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  props: ['route', 'type'],
  data() {
    return {
      actions: null,
      current: this.$store.state.menu.current,
    };
  },
  async mounted() {
    this.actions = await api.getMenuActions(this.current.id, this.type);
  },
  methods: {
    handle(item) {
      if (this.route) {
        api.gotoMenuItem(item.id);
      } else {
        this.$emit('action', item);
      }
    },
  },
}
</script>

<style lang="sass">
.menu-actions
  display: flex

  &__action + &__action
    margin-left: 10px
</style>
