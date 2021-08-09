<template lang="pug">
  .input-group(:class="classes")
    InputDecorate.input-group__decorate(:field="field", :name="name", :value="value", :ident="ident", @addItem="addItem", @removeItem="removeItem", :actions="{add: true, remove: true}", :noLabel="true")
      template(v-slot="{ id, value, index, ident, label }")
        h3.input-group__label(@click="click")
          span.input-group__label-text
            | {{ label }}
          i.input-group__label-icon(:class="(open ? 'el-icon-minus' : 'el-icon-plus')")
        transition(name="fade")
          InputForm.input-group__form(v-if="open", :form="field.form", v-model="value", :ident="ident", :style="getStyles()", :config="config")
</template>

<script>
import Form from '~/client/form/Form';

export default {
  props: ['field', 'value', 'name', 'ident', 'config'],
  data() {
    return {
      open: this.field.open === undefined ? false : this.field.open,
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.open) {
        classes.push('input-group--open');
      }
      return classes;
    },
  },
  methods: {
    click() {
      this.open = !this.open;
    },

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
      if (this.field.grid) {
        styles.display = 'grid';
        if (typeof this.field.grid === 'number') {
          styles['grid-template-columns'] = 'repeat(' + this.field.grid + ', 1fr)';
        } else {
          styles['grid-template-columns'] = this.field.grid;
        }
        styles['grid-gap'] = '10px';
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
  margin-bottom: 20px

  & &__decorate
    margin-bottom: 0

  &__label
    padding: 10px
    background: #DCDFE6
    cursor: pointer
    display: flex
    justify-content: space-between
    align-items: center

  &__form
    padding: 10px

</style>
