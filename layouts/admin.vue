<template lang="pug">
  el-container.admin
    el-header.admin__header
      MenuNav
      MenuBreadcrumb
    el-main
      Nuxt
</template>

<script>
import System from '~/client/system';

const logger = System.logger('admin');

export default {
  errorCaptured (err, vm, info) {
    logger.error(err);
  },
}
</script>

<style lang="sass">
.admin

  &__header
    padding: 0
    height: auto !important
</style>
