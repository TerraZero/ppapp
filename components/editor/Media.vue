<template lang="pug">
  img.editor-media(:src="src")
</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  props: ['value', 'media'],
  async mounted() {
    if (this.media && this.media.path) {
      this.src = this.media.path;
    } else if (this.value) {
      const response = await api.request('mediaeditor.load', {id: this.value});
      this.src = response.content.media.path;
    }
  },
  data() {
    return {
      src: '',
    };
  },
}
</script>

<style lang="sass">
.editor-media
  +layout__full
</style>
