<template lang="pug">
  .cyber-actions
    CyberButton.cyber-actions__button(v-for="item, index in items", :key="item.action", :theme="item.theme", :type="item.type", @click.native="$emit('click', item.action, item)")
      slot(:item="item")
        | {{ item.text }}
</template>

<script>

export default {
  props: ['actions'],
  computed: {
    items() {
      const items = [];
      const length = (Array.isArray(this.actions) ? this.actions.length : Object.keys(this.actions).length);

      for (const index in this.actions) {
        const item = {
          action: index,
          button: this.actions[index],
        };
        if (typeof this.actions[index] === 'string') {
          item.text = this.actions[index];
        } else {
          item.theme = this.actions[index].theme || false;
          item.text = this.actions[index].text || false;
        }

        if (items.length === 0) {
          item.type = 0;
        } else if (items.length === length - 1) {
          item.type = 4;
        } else if (items.length === length - 2 && (items.length - 1) % 3 === 0) {
          item.type = 3;
        } else {
          item.type = (items.length - 1) % 3 + 1;
        }
        items.push(item);
      }
      return items;
    },
  },
};
</script>

<style lang="sass">

</style>
