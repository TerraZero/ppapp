<template lang="pug">
  LayoutContainer(:loading="loading")
    template(#title)
      MenuTitle
    template(#controls)
      slot(name="controls")
    InputForm(:form="form", v-model="state", :config="config")
    template(#actions)
      el-button(v-for="action in d_actions", :key="action.key", :type="action.config.type", :icon="action.config.icon ? 'el-icon-' + action.config.icon : ''", :loading="loading", :disabled="action.config.disabled || loading", @click="handle(action)") {{ action.label }}
</template>

<script>
import Form from '~/client/form/Form';
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  props: ['id', 'info', 'actions'],
  data() {
    return {
      loading: true,
      form: null,
      state: null,
      config: {},
      d_actions: null,
    };
  },
  async fetch() {
    const content = (await api.request('form.build', {id: this.id}, {info: this.info || {}})).content;

    this.state = Form.getState(content.form);
    this.form = content.form;
    this.d_actions = (this.actions || []).concat(content.actions || []);
    this.loading = false;
  },
  methods: {
    async handle(action) {
      this.loading = true;
      const data = {
        values: Form.getValue(this.form, this.state),
        action: action,
        info: this.info || {},
      };
      const response = (await api.request('form.submit', {id: this.id}, data));

      if (response) {
        Form.doResults(this, api, this.form, data.values, response.content.results);
        this.config = response.content.config;
      }
      
      this.loading = false;
    }
  },
};
</script>

<style lang="sass">

</style>
