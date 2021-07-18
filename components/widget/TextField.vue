<template lang="pug">
  .text-field
    h3.text-field__label {{ label }}
    WidgetMulti(v-if="field", :value="value", :field="field", @addItem="addItem", @cleanItems="cleanItems")
      template(v-slot="{ data = {value: ''}, schema, count }")
        el-input.text-field__input(:value="data.value", @input="input(count, $event)", :maxlength="schema.storage.config.length", show-word-limit)
    el-input.text-field__input(v-if="prop", :value="value", @input="single", :maxlength="prop.config.length", show-word-limit)
    el-divider
</template>

<script>
export default {
  props: ['value', 'field', 'prop', 'display'],
  data() {
    return {};
  },
  computed: {
    label() {
      return (this.field ? this.field.label : this.prop.label || this.prop.name);
    },
  },
  methods: {
    log(...value) {
      console.log(...value);
      return value[0];
    },
    single(input) {
       this.$emit('input', input);
    },

    addItem(count = 1) {
      const value = this.value;
      
      for (let i = 0; i < count; i++) {
        value.push({value: ''});
      }
      this.$emit('input', value);
    },

    cleanItems() {
      const value = [];
      for (const item of this.value) {
        if (item.value !== '') {
          value.push(item);
        }
      }
      this.$emit('input', value);
    },

    input(count, input) {
      const value = this.value;

      while (count >= value.length) {
        value.push({value: ''});
      }
      value[count].value = input;
      this.$emit('input', value);
    },
  },
}
</script>

<style lang="sass">
.text-field

  &__label
    margin-bottom: 10px

  &__input
    margin-bottom: 10px
</style>
