<template lang="pug">
  .input-checkbox(:style="getStyles()")
    InputDecorate(:field="field", :name="name", :value="value", :ident="ident", :label="label", :noLabel="true", @addItem="addItem", @removeItem="removeItem", :actions="{add: true, remove: true}")
      template(v-slot="{ value, index, ident, label }")
        el-checkbox(:id="ident", :value="value", @input="input($event, index)", :border="field.border") {{ label }}
    el-divider
</template>

<script>
export default {
  props: ['field', 'value', 'name', 'ident'],
  computed: {
    label() {
      if (this.value) return this.field.on_label || this.field.label;
      if (!this.value) return this.field.off_label || this.field.label;
    },
  },
  methods: {
    getStyles() {
      const styles = {};

      if (this.field.span) {
        styles['grid-column'] = this.field.span + ' span';
      }
      return styles;
    },

    addItem(count) {
      for (let i = 0; i < count; i++) {
        this.value.push({value: false});
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
