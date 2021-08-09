<template lang="pug">
  .input-textfield(:style="getStyles()")
    InputDecorate(:field="field", :name="name", :value="value", :ident="ident", :config="config", @addItem="addItem", @cleanItems="cleanItems", @removeItem="removeItem", :actions="{add: true, remove: true, clean: true}")
      template(v-slot="{ value, index, ident, disabled }")
        el-input.input-textfield__input(:id="ident", :value="value", @input="input($event, index)", :placeholder="field.placeholder", :suffix-icon="(field.mask ? 'el-icon-cpu' : '')", :disabled="disabled")
    el-divider
</template>

<script>
import Form from '~/client/form/Form';

export default {
  props: ['field', 'value', 'name', 'ident', 'config'],
  methods: {
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
        if (item.value !== '' && item.value !== null) {
          value.push(item);
        }
      }
      if (!value.length) {
        value.push({value: ''});
      }
      this.$emit('input', value);
    },

    addItem(count) {
      for (let i = 0; i < count; i++) {
        this.value.push({value: ''});
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
      if (this.field.mask) {
        value = Form.getMask(this.field.mask, value);
      }
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
