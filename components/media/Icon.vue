<template lang="pug">
  .media-icon(v-html="source")
</template>

<script>
import Axios from 'axios';
export default {
  props: ['src'],
  data() {
    return {
      source: '',
    };
  },
  async mounted() {
    const data = await Axios.get('/images/icons' + this.src);

    this.source = data.data;
  },
};
</script>

<style lang="sass">
.media-icon
  +layout__full

  & > svg
    width: 100% !important
    height: 100% !important
</style>
