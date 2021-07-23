<template lang="pug">
.content-list-page
  LayoutContainer
    template(#title)
      h1 List {{ label }}
    template(#controls)
      .content-list-page__actions
        el-input(placeholder="Search", prefix-icon="el-icon-search", :value="search" @input="input('search', $event)")
        el-select(placeholder="Filter Bundle", :value="bundle", @input="input('bundle', $event)")
          el-option(v-for="item in options", :key="item.value", :label="item.label", :value="item.value")
        FormButton(type="primary", icon="el-icon-plus", :text="'Create ' + label", @click.native="create")
    el-table(:data="contents")
      el-table-column(prop="label", label="Label")
      el-table-column(prop="id", label="ID")
      el-table-column(prop="bundle", label="Bundle")
      el-table-column(prop="entity", label="Entity")
      el-table-column(prop="ops", label="Operations")
        template(slot-scope="props")
          el-button(type="primary", icon="el-icon-view", circle, @click="action(props.row, 'view')")
          el-button(type="primary", icon="el-icon-edit", circle, @click="action(props.row, 'edit')")
          el-button(type="danger", icon="el-icon-delete", circle, @click="action(props.row, 'delete')")
    el-pagination.content-list-page__pager(:page-size="pager.limit", :current-page.sync="pager.page", :pager-count="11", layout="prev, pager, next", :total="pager.total", @current-change="paging")
</template>

<script>
import API from '~/client/api/API';

const api = new API('/api');

export default {
  layout: "admin",
  data() {
    return {
      search: '',
      bundle: '',
    };
  },
  computed: {
    options() {
      const options = [];

      for (const bundle in this.bundles) {
        options.push({
          value: bundle,
          label: this.bundles[bundle],
        });
      }
      return options;
    },
  },
  methods: {
    paging() {
      this.doSearch();
    },
    create() {
      this.$router.push('/admin/content/' + this.params.entity + '/new');
    },
    input(key, value) {
      this[key] = value;
      this.doSearch();
    },
    async doSearch() {
      const content = (await api.request('content.list', this.params, { search: this.search, filters: {bundle: this.bundle}, pager: this.pager })).content;

      this.contents = content.data;
    },
    action(row, op) {
      switch (op) {
        case 'view':
          this.$router.push('/' + row.entity + '/' + row.id);
          break;
        default:
          this.$router.push('/admin/content/' + row.entity + '/' + row.id + '/' + op);
          break;
      }
    },
  },
  async asyncData({ params }) {
    const content = (await api.request('content.list', params)).content;
    const bundles = (await api.request('schema.view', params)).content;

    return {
      contents: content.data, 
      params, label: content.label, 
      bundles: bundles.bundles, 
      pager: content.pager,
    };
  }
}
</script>

<style lang="sass">
.content-list-page

  &__actions
    display: grid
    grid-template-columns: 1fr 1fr min-content
    grid-gap: 10px

  &__pager
    text-align: center
</style>
