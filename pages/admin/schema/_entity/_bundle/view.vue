<template lang="pug">
  .page
    LayoutContainer
      template(v-slot:title)
        h2 {{ schema.label }} storage
      el-table(:data="storage")
        el-table-column(prop="prop", label="Property")
        el-table-column(prop="value", label="Value")

    LayoutContainer
      template(v-slot:title)
        h2 {{ schema.label }} property
      el-table(:data="property")
        el-table-column(prop="name", label="Name")
        el-table-column(prop="type", label="Type")
        el-table-column(prop="config", label="Config")
          template(slot-scope="props")
            el-table(:data="props.row.config", :show-header="false")
              el-table-column(prop="label")
              el-table-column(prop="value")

    LayoutContainer
      template(v-slot:title)
        h2 {{ schema.label }} fields
      el-table(:data="fields")
        el-table-column(prop="label", label="Label")
        el-table-column(prop="key", label="Key")
        el-table-column(prop="type", label="Type")
        el-table-column(prop="cardinality", label="Cardinality")
        el-table-column(prop="config", label="Config")
          template(slot-scope="props")
            el-table(:data="props.row.config.storage")
              el-table-column(prop="label", label="Storage")
              el-table-column(prop="value")
            el-table(:data="props.row.config.instance")
              el-table-column(prop="label", label="Instance")
              el-table-column(prop="value")

</template>

<script>
import API from '~/client/api/API';

const api = new API('/api');

export default {
  layout: "admin",
  computed: {
    storage() {
      const data = [];
      for (const field in this.schema.storage) {
        if (field === 'fields') continue;
        data.push({
          prop: field,
          value: (typeof this.schema.storage[field] === 'object' ? JSON.stringify(this.schema.storage[field]) : this.schema.storage[field]),
        });
      }
      return data;
    },

    property() {
      const data = [];
      for (const field in this.schema.props) {
        const config = [];
        for (const conf in this.schema.props[field].config) {
          config.push({
            label: conf,
            value: this.schema.props[field].config[conf],
          });
        }
        data.push({
          name: this.schema.props[field].name,
          type: this.schema.props[field].type,
          config: config,
        });
      }
      return data;
    },

    fields() {
      const data = [];
      for (const field in this.schema.storage.fields) {
        const info = this.schema.storage.fields[field];
        const config = {
          storage: [],
          instance: [],
        };

        for (const label in info.storage.config) {
          config.storage.push({
            label: label,
            value: info.storage.config[label],
          });
        }

        for (const label in info.instance) {
          if (['label', 'cardinality'].includes(label)) continue;

          config.instance.push({
            label: label,
            value: info.instance[label],
          });
        }

        data.push({
          label: info.label,
          key: field,
          type: info.storage.type,
          cardinality: (info.instance.cardinality === 0 ? 'Unlimited' : info.instance.cardinality),
          config: config,
        });
      }
      return data;
    },
  },
  async asyncData({ params }) {
    const param = { entity: params.entity, bundle: params.bundle };
    const schema = (await api.request('schema.view', param)).content;
    for (const field in schema.storage.fields) {
      param.field = field;
      schema.storage.fields[field] = (await api.request('schema.view', param)).content;
    }
    return { entity: params.entity, bundle: params.bundle, schema };
  }
}
</script>

<style lang="sass">

</style>
