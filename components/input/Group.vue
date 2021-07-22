<template lang="pug">
  .input-group
    InputDecorate.input-group__decorate(:field="field", :name="name", :value="value", :ident="ident", @addItem="addItem", @removeItem="removeItem", :actions="{add: true, remove: true}")
      template(v-slot="{ id, value, index, ident }")
        InputForm(:form="field.form", v-model="value", :ident="ident", :style="getStyles()")
</template>

<script>
import Form from '~/client/form/Form';

export default {
  props: ['field', 'value', 'name', 'ident'],
  methods: {
    addItem(count) {
      for (let i = 0; i < count; i++) {
        this.value.push({value: Form.getState(this.field.form)});
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

    getStyles() {
      const styles = {};
      if (this.field.ggrid) {
        styles.display = 'grid';
        styles['grid-template-columns'] = this.field.ggrid.columns;
        if (this.field.ggrid.gap) {
          styles['grid-gap'] = this.field.ggrid.gap;
        }
      }
      return styles;
    },
  },
};
</script>

<style lang="sass">
.input-group
  border: 2px solid #DCDFE6
  border-radius: 4px
  padding: 10px
  margin-bottom: 20px

  & &__decorate
    margin-bottom: 0

</style>
