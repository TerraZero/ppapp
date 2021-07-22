<template lang="pug">
  .input-textfield(:style="getStyles()")
    InputDecorate(:field="field", :name="name", :value="value", :ident="ident", @addItem="addItem", @cleanItems="cleanItems", @removeItem="removeItem", :actions="{add: true, remove: true, clean: true}")
      template(v-slot="{ value, index, ident }")
        el-input-number.input-textfield__input(:id="ident", :value="value", @input="input($event, index)", :placeholder="field.placeholder", :min="getConfig('min', -Infinity)", :max="getConfig('max', Infinity)", :step="getConfig('step', 1)", :precision="getConfig('precision', 0)")
    el-divider
</template>

<script>
export default {
  props: ['field', 'value', 'name', 'ident'],
  methods: {
    getConfig(name, fallback) {
      if (this.field[name] === undefined) {
        return fallback;
      }
      return this.field[name];
    },

    getStyles() {
      const styles = {};

      if (this.field.span) {
        styles['grid-column'] = this.field.span + ' span';
      }
      return styles;
    },

    cleanItems() {
      const value = [];
      for (const item of this.value) {
        if (item.value !== 0 && item.value !== null) {
          value.push(item);
        }
      }
      if (!value.length) {
        value.push({value: 0});
      }
      this.$emit('input', value);
    },

    addItem(count) {
      for (let i = 0; i < count; i++) {
        this.value.push({value: 0});
      }
      this.$emit('input', this.value);
    },

    removeItem(count) {
      for (let i = 0; i < count; i++) {
        this.value.pop();
      }
      if (!this.value.length) {
        this.addItem(count);
      } else {
        this.$emit('input', this.value);
      }
    },

    input(value, index) {
      if (index === undefined) {
        this.$emit('input', value);
      } else {
        this.value[index].value = value;
        this.$emit('input', this.value);
      }
    },
  },
};
</script>

<style lang="sass">

</style>
