<template lang="pug">
.entity-form
  LayoutContainer
    template(#title)
      h1(v-if="page") {{ title }}
      h2(v-else) {{ title }}
    EntityInfo(v-if="data", :data="data")
    WidgetTextField(v-if="data", v-for="prop, name in props", :key="name", :prop="prop", :value="getValue('prop', prop)", @input="doInput('prop', prop, $event)")
    WidgetTextField(v-if="data", v-for="field, key in fields", :key="key", :field="field", :value="getValue('field', field)", @input="doInput('field', field, $event)")
    .entity-form__actions
      el-button(type="primary", icon="el-icon-check", :loading="loading", @click="save()") Save
      el-button(icon="el-icon-close", @click="abort()") Abort

</template>

<script>
import API from '~/client/api/API';

const api = new API('/api');

export default {
  props: ['entity', 'bundle', 'id', 'page'],
  mounted() {
    this.update();
  },
  data() {
    return {
      params: null,
      data: null,
      schema: null,
      fields: [],
      loading: false,
    };
  },
  computed: {
    title() {
      if (this.mode === 'edit') {
        if (this.schema !== null) {
          return 'Edit ' + this.schema.label + ' ' + this.id;
        }
      } else {
        return 'Create new ' + this.bundle;
      }
    },
    props() {
      let props = {};
      if (this.schema !== null) {
        props = this.schema.props;
      }
      return props;
    },
  },
  methods: {
    getValue(type, schema) {
      if (type === 'field') {
        this.data.fields[schema.storage.field] = this.data.fields[schema.storage.field] || [];
        return this.data.fields[schema.storage.field];
      } else {
        return this.data[schema.name];
      }
    },

    doInput(type, schema, value) {
      if (type === 'field') {
        this.data.fields[schema.storage.field] = value;
      } else {
        this.data[schema.name] = value;
      }
    },

    async save() {
      this.loading = true;
      console.log(this.mode);
      if (this.mode === 'edit') {
        (await api.request('content.update', this.params, {data: this.data}));
      } else {
        console.log((await api.request('content.create', this.params, {data: this.data})));
      }
      this.$notify({
        title: 'Success',
        message: 'The entity "[' + this.params.entity + ':' + this.params.id + '] ' + this.data.label + '" was saved.',
        type: 'success',
        showClose: false,
        onClick: function() {
          this.close();
        },
      });
      this.$router.push('/admin/content/' + this.params.entity);
    },

    async abort() {
      this.$router.push('/admin/content/' + this.params.entity);
    },

    async update(data = null) {
      this.mode = this.bundle ? 'new' : 'edit';

      if (this.mode === 'new') {
        this.params = {
          entity: this.entity,
          bundle: this.bundle,
        };
        data = (await api.request('content.new', this.params)).content.entity;
        this.params = {
          entity: this.entity,
          bundle: this.bundle,
        };
      } else {
        this.params = {
          entity: this.entity,
          id: this.id,
        };
        if (data === null) {
          data = (await api.request('content.view', this.params)).content.entity;
        }
        this.params = {
          entity: this.entity,
          bundle: data.bundle,
          id: this.id,
        };
      }

      this.schema = (await api.request('schema.view', this.params)).content;

      this.fields = [];
      for (const field in this.schema.storage.fields) {
        this.params.field = field;
        this.fields.push((await api.request('schema.view', this.params)).content);
        data.fields[field] = (data.fields[field] === undefined) ? [] : data.fields[field];
      }

      this.data = data;
    },
  },
}
</script>

<style lang="sass">
.entity-form

  &__actions
    text-align: right
</style>
