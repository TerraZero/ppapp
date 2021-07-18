<template lang="pug">
.entity-info(:class="classes")
  el-table.entity-info__table(:data="info")
    el-table-column(prop="label", :show-header="false")
    el-table-column(prop="value", :show-header="false")
</template>

<script>
export default {
  props: ['data', 'modi'],
  computed: {
    classes() {
      let modis = this.modi;
      if (!Array.isArray(modis)) modis = [modis];

      const classes = [];
      for (const modi of modis) {
        classes.push('entity-info--' + modi);
      }
      return classes;
    },
    info() {
      if (this.data === null) return [];
      return [
        {label: 'Entity', value: this.data.entity},
        {label: 'Bundle', value: this.data.bundle},
        {label: 'ID', value: this.data.id || '[new]'},
      ];
    }
  },
}
</script>

<style lang="sass">
.entity-info

  &__table
    border: 2px solid #DCDFE6
    border-radius: 4px
    margin-bottom: 20px

  &--danger &__table
    border-color: #F56C6C

  &__table .el-table__header-wrapper
    display: none
</style>
