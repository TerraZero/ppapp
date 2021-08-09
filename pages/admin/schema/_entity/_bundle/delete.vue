<template lang="pug">
  LayoutContainer(type="danger")
    template(#title)
      h1 Delete Bundle {{ bundlelabel }}
    template(#controls)
      MenuBack(label="Abort")
    EntityInfo
    TextWarning
      p Are you sure, to delete bundle <pre class="pre pre--inline">{{ bundlelabel }}</pre>
      p You will delete all <pre class="pre pre--inline">{{ entitylabel }}</pre> from bundle <pre class="pre pre--inline">{{ bundlelabel }}</pre> (Total: {{ total }})
    template(#actions)
      el-button(type="danger", icon="el-icon-delete", :loading="loading", @click="handle") Delete
      MenuBack(label="Abort")
</template>

<script>
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
    async handle() {
      this.loading = true;
      await api.request('schema.delete', this.params);
      api.gotoMenuItem('schema.' + this.params.entity);
    },
  },
  async asyncData({ params }) {
    const total = (await api.request('content.list', {entity: params.entity}, {filters: {bundle: params.bundle}, pager: {limit: 0, page: 1}})).content.pager.total;
    const data = (await api.request('schema.view', params)).content;

    return { 
      params,
      total,
      entitylabel: data.entitylabel,
      bundlelabel: data.label,
    };
  }
}
</script>

<style lang="sass">

</style>
