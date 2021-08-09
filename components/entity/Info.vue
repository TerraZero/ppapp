<template lang="pug">
.entity-info(:class="classes")
  el-table.entity-info__table(:data="info")
    el-table-column(prop="label", :show-header="false")
    el-table-column(prop="key", :show-header="false")
    el-table-column(prop="value", :show-header="false")
</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  props: ['params', 'modi'],
  data() {
    return {
      current: null,
      infos: null,
      values: null,
    };
  },
  async mounted() {
    this.current = await api.getCurrentMenuItem();
    this.values = this.params || await api.getMenuParams() || this.$route.params;

    if (this.values.entity && this.values.id) {
      this.infos = (await api.request('content.view', {entity: this.values.entity, id: this.values.id}, {fields: []})).content;
    }
  },
  computed: {
    modis() {
      let modis = this.modi;
      if (!Array.isArray(modis)) modis = [modis];
      if (this.current && this.current.id.startsWith('schema.')) modis.push('schema');
      if (this.current && this.current.config.category) modis.push(this.current.config.category);
      return modis;
    },

    classes() {
      const classes = [];
      for (const modi of this.modis) {
        classes.push('entity-info--' + modi);
      }
      return classes;
    },

    info() {
      if (this.infos === null || this.data === null) return [];

      const rows = [
        {label: 'Entity', key: this.infos.schema.entity.entity, value: this.infos.schema.entity.entitylabel},
        {label: 'Bundle', key: this.infos.entity.bundle, value: this.infos.entity.label},
      ];


      if (!this.modis.includes('schema')) {
        rows.push({
          label: 'ID',
          key: '',
          value: this.values.id || '[new]',
        });
      }
      
      return rows;
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
