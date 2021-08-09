<template lang="pug">
  LayoutContainer
    template(#title)
      MenuTitle
    template(#controls)
      MenuBack(label="Back")
    el-table(:data="bundles")
      el-table-column(prop="label", label="Label")
      el-table-column(prop="key", label="Key")
      el-table-column(prop="ops", label="Operations")
        template(slot-scope="props")
          el-button(v-for="op in props.row.ops", :key="op.action", :type="op.type", :icon="'el-icon-' + op.icon", circle, @click="action(props.row, op)")

</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  layout: "admin",
  methods: {
    action(row, op) {
      api.gotoMenuItem('schema.' + this.entity + '.' + op.action);
    },
  },
  computed: {
    bundles() {
      const bundles = [];

      for (const bundle in this.schema.bundles) {
        bundles.push({
          key: bundle,
          label: this.schema.bundles[bundle],
          ops: [
            {
              type: 'primary',
              icon: 'view',
              action: bundle,
            },
            {
              type: 'primary',
              icon: 'edit',
              action: bundle + '.edit',
            },
            {
              type: 'danger',
              icon: 'delete',
              action: bundle + '.delete',
            },
          ],
        });
      }
      return bundles;
    },
  },
  async asyncData({ params }) {
    const param = { entity: params.entity };
    const schema = (await api.request('schema.view', param)).content;

    return { entity: params.entity, schema };
  }
}
</script>

<style lang="sass">

</style>
