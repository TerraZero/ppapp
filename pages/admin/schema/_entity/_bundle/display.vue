<template lang="pug">
  .schema-display-page
    h1 Delete Schema "{{ params.entity }}:{{ params.bundle }}" [TODO]

</template>

<script>
import API from '~/client/api/API';

const api = new API('/api');

export default {
  layout: "admin",
  async asyncData({ params }) {
    const content = (await api.request('display.form', param)).content;
    
    console.log(content);
    return { params };
  }
}
</script>

<style lang="sass">

</style>
