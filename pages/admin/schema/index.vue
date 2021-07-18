<template lang="pug">
  .page
    h1 Schema

    LayoutContainer
      template(v-slot:title)
        h2 Entities
      el-table(:data="entities")
        el-table-column(prop="label", label="Label")
        el-table-column(prop="key", label="Key")
        el-table-column(prop="ops", label="Operations")
          template(slot-scope="props")
            el-button(v-for="op in props.row.ops", :key="op.action", :type="op.type", :icon="'el-icon-' + op.action", circle, @click="action(props.row, op)")

</template>

<script>
import API from '~/client/api/API';

const api = new API('/api');

export default {
  layout: "admin",
  methods: {
    action(row, op) {
      switch (op.action) {
        case 'view':
          this.$router.push('/admin/schema/' + row.key);
          break;
      }
    },
  },
  computed: {
    entities() {
      const entities = [];

      for (const entity in this.schema.entities) {
        entities.push({
          key: entity,
          label: this.schema.entities[entity],
          ops: [
            {
              type: 'primary',
              action: 'view',
            },
            {
              type: 'primary',
              action: 'edit',
            }
          ],
        });
      }
      return entities;
    },
  },
  async asyncData() {
    const schema = (await api.request('schema.view')).content;
    console.log(schema);
    return { schema };
  }
}
</script>

<style lang="sass">

</style>
