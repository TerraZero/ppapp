<template lang="pug">
.content-create-page
  EntityForm(:entity="params.entity", :bundle="params.bundle")
</template>

<script>
import API from '~/client/api/API';

const api = new API('/api');

export default {
  layout: "admin",
  methods: {
    create(bundle) {
      this.$router.push('/admin/content/' + this.params.entity + '/new/' + bundle);
    },
  },
  async asyncData({ params }) {
    const content = (await api.request('schema.view', params)).content;
    
    return {
      params: params,
      label: content.label, 
      bundles: content.bundles,
    };
  }
}
</script>

<style lang="sass">

</style>
