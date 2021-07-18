<template lang="pug">
  .multi
    .multi__content
      .multi__value(v-for="count in counts", :key="count")
        slot(:values="value", :data="value && value[count - 1] || undefined", :schema="field", :count="count - 1")
    .multi__actions
      FormButton(v-if="field.instance.cardinality === 0", type="primary", icon="el-icon-plus", text="New Item", @click.native="$emit('addItem')")
      FormButton(v-if="field.instance.cardinality === 0", type="danger", icon="el-icon-magic-stick", text="Clean", @click.native="$emit('cleanItems')")
</template>

<script>
export default {
  props: ['value', 'field'],
  data() {
    return {};
  },
  computed: {
    counts() {
      const count = (this.value && this.value.length || 0);
      if (this.field.instance.cardinality === 0) {
        if (count === 0) {
          this.$emit('addItem', 1);
        }
      } else if (count < this.field.instance.cardinality) {
        this.$emit('addItem', this.field.instance.cardinality - count);
      }
      return this.value && this.value.length || 0;
    },
  },
};
</script>

<style lang="sass">
.multi

  &__actions
    text-align: right
</style>
