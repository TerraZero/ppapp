<template lang="pug">
  LayoutContainer
    template(v-slot:title)
      MenuTitle
    el-table(:data="entities")
      el-table-column(prop="label", label="Label")
      el-table-column(prop="key", label="Key")
      el-table-column(prop="ops", label="Operations")
        template(slot-scope="props")
          el-button(v-for="op in props.row.ops", :key="op.action", :type="op.type", :icon="'el-icon-' + op.action", circle, @click="action(props.row, op)")

</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  layout: "admin",
  methods: {
    action(row, op) {
      switch (op.action) {
        case 'view':
          this.$router.push('/admin/content/' + row.key);
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
          ],
        });
      }
      return entities;
    },
  },
  async asyncData() {
    const schema = (await api.request('schema.view')).content;

    return { schema };
  }
}
</script>

<style lang="sass">

</style>
