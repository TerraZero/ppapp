<template lang="pug">
.input-form
  component.input-form__field(v-for="field, name in form", :key="name" :is="field.comp", :name="name", :ident="getIdent(name)", :field="field", :value="value[name]", :config="config || {}", @input="input(field, name, $event)")
</template>

<script>

export default {
  props: ['form', 'value', 'ident', 'config'],
  methods: {
    getIdent(name) {
      if (this.ident) {
        return this.ident + '.' + name;
      }
      return name;
    },

    getValue(name) {
      return this[name];
    },

    input(field, name, value) {
      this.value[name] = value;
      this.$emit('input', this.value);
    },
  },
};
</script>

<style lang="sass">
.input-form

  &__field:last-child > .el-divider
    display: none
</style>
