<template lang="pug">
  .input-radio(:style="getStyles()")
    InputDecorate(:field="field", :name="name", :value="value", :ident="ident", @addItem="addItem", @cleanItems="cleanItems", @removeItem="removeItem", :actions="{add: true, remove: true, clean: true}")
      template(v-slot="{ value, index, ident, label }")
        el-radio.input-radio__input(v-for="option, item in field.options", :key="option", :label="item", :id="ident", :value="value", @input="input($event, index)") {{ option }}
    el-divider
</template>

<script>
export default {
  props: ['field', 'value', 'name', 'ident'],
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
.input-radio

  &__input
    display: block
    
  &__input + &__input
    margin-top: 10px
    
</style>
