<template lang="pug">
  .content-delete-page
    LayoutContainer(type="danger")
      template(#title)
        h1 Delete {{ title }}
      EntityInfo(v-if="data", :data="data", modi="danger")
      p Are you sure, to delete <pre class="pre pre--inline">{{ title }}</pre>
      .content-delete-page__actions
        el-button(type="danger", icon="el-icon-delete", :loading="loading", @click="clear()") Delete
        el-button(icon="el-icon-close", @click="abort()") Abort
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
  computed: {
    title() {
      return '[' + this.params.entity + ':' + this.params.id + '] - ' + this.data.label;
    }
  },
  methods: {
    async clear() {
      this.loading = true;
      (await api.request('content.delete', this.params));
      this.$notify({
        title: 'Success',
        message: 'The entity "[' + this.params.entity + ':' + this.params.id + '] ' + this.data.label + '" was deleted.',
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
  },
  async asyncData({ params }) {
    const data = (await api.request('content.view', params)).content.entity;

    return { params, data };
  }
}
</script>

<style lang="sass">
.content-delete-page

  &__actions
    margin-top: 10px
</style>
