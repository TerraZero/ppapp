<template lang="pug">
  .page
    LayoutContainer
      template(#title)
        h2 {{ schema.label }} Bundles
      template(#controls)
        MenuActions(:route="true")
      el-table(:data="bundles")
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
      this.$router.push('/admin/schema/' + this.entity + '/' + row.key + '/' + op.action);
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
              action: 'view',
            },
            {
              type: 'primary',
              action: 'edit',
            },
            {
              type: 'danger',
              action: 'delete',
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
