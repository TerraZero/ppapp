<template lang="pug">
  LayoutContainer
    template(#title)
      MenuTitle
    template(#controls)
      MenuBack(label="Back to Overview")
    InputForm(:form="form", v-model="state")
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
      value.config = value.config || {};
      value.fields = value.fields || {};

      await api.request('schema.create.entity.form.submit', { entity: value.entity, value });
      this.loading = false;
      api.gotoParent();
    },
  },
  async asyncData({ params }) {
    const param = { entity: params.entity };
    const form = (await api.request('schema.create.entity.form', param)).content.form;

    return { 
      param: param,
      form: form,
      state: Form.getState(form),
    };
  }
}
</script>

<style lang="sass">

</style>
