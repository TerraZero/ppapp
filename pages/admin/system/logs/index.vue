<template lang="pug">
  LayoutContainer.logs
    template(#title)
      h1 Logs
    template(#controls)
      el-button(v-for="button of debug", :key="button.type", @click="showDebug(button)", :type="button.type") {{ button.notify }}
    template(#filters)
      el-select(v-model="filters.type")
        el-option(label="- Filter Type -", value="")
        el-option(label="Note", value="note")
        el-option(label="Info", value="info")
        el-option(label="Success", value="success")
        el-option(label="Warning", value="warning")
        el-option(label="Error", value="error")
      el-input(placeholder="Filter Title", v-model="filters.title")
      el-select(v-model="filters.channel", allow-create, filterable)
        el-option(label="- Filter Channel -", value="")
    el-table(:data="items", :cell-class-name="cellClass", @row-click="rowClick")
      el-table-column(width="40")
        template(slot-scope="{ row }")
          i.el-icon-warning(v-if="row.isNew")
      el-table-column(prop="type", label="Type")
      el-table-column(prop="channel", label="Channel")
      el-table-column(prop="title", label="Title")
</template>

<script>
import System from '~/client/system';

const logger = System.logger('test');

export default {
  layout: "admin",
  data() {
    return {
      logs: this.$store.state.logs.logs,
      filters: {
        type: '',
        title: '',
      },
      debug: [
        {
          type: 'note',
          notify: 'note',
        },
        {
          type: 'info',
          notify: 'info',
        },
        {
          type: 'success',
          notify: 'success',
        },
        {
          type: 'warning',
          notify: 'warning',
        },
        {
          type: 'danger',
          notify: 'error',
        },
      ],
    };
  },
  computed: {
    items() {
      return this.logs.filter((v) => {
        for (const filter in this.filters) {
          if (this.filters[filter] === '') continue;
          if (v[filter].indexOf(this.filters[filter]) === -1) return false;
        }
        return true;
      });
    },
  },
  methods: {
    showDebug(button) {
      logger[button.notify]({
        title: 'Test ' + button.notify,
        message: 'My Message for ' + button.notify,
        context: button,
      });
    },

    cellClass({ row }) {
      return [
        'logs__cell',
        'message__color--' + row.type,
        row.isNew ? 'logs__cell--new' : '',
      ].join(' ');
    },

    rowClick(row) {
      this.$router.push('/admin/system/logs/' + row.id);
    },
  },
}
</script>

<style lang="sass">
.logs 

  &__cell
    cursor: pointer
</style>
