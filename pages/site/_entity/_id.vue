<template lang="pug">
  .page
    h1 Show "{{ params.entity }}:{{ params.id }}" [TODO]

</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  async asyncData({ params }) {
    console.log('data');
    const param = await api.getMenuParams();
    console.log(param);
    return { params };
  }
}
</script>

<style lang="sass">

</style>
