<template lang="pug">
  LayoutContainer
    template(#title)
      MenuTitle
    template(#controls)
      MenuBack(label="Back")
    EntityInfo(:data="schema", modi="schema")
    InputForm(:form="form", v-model="state", :config="config")
    template(#actions)
      el-button(type="primary", icon="el-icon-check", :loading="loading", @click="save()") Save
      MenuBack(label="Abort")
</template>

<script>
import Form from '~/client/form/Form';
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  layout: "admin",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async save() {
      this.loading = true;

      const value = Form.getValue(this.form, this.state);
      value.entity = this.param.entity;

      await api.request('schema.create.entity.form.submit', { entity: value.entity, bundle: value.bundle, value });
      this.loading = false;
      api.gotoParent();
    },
  },
  async asyncData({ params }) {
    const param = { 
      entity: params.entity, 
      bundle: params.bundle, 
      config: {
        mode: 'edit',
      },
    };
    const content = (await api.request('schema.create.entity.form', param)).content;
    
    return {
      config: param.config,
      param: param,
      form: content.form,
      schema: content.schema,
      state: Form.getState(content.form, content.schema),
    };
  }
}
</script>

<style lang="sass">

</style>
