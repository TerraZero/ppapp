<template lang="pug">
.content-create-page
  LayoutList(:items="bundles")
    template(#title)
        h1 Create {{ label }}
    template(#actions)
      FormButton(icon="el-icon-close", text="Abort", @click.native="abort")
    template(v-slot="props")
      el-link(:underline="false", @click="create(props.index)")
        | {{ props.item }} 
        i.el-icon-arrow-right

</template>

<script>
import API from '~/client/api/API';

const api = new API('/api');

export default {
  layout: "admin",
  methods: {
    abort() {
      this.$router.push('/admin/content/' + this.params.entity);
    },
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
