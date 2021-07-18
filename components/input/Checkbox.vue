<template lang="pug">
  el-checkbox.input-checkbox(:value="value", @input="$emit('input', $event)") {{ label }}
</template>

<script>
export default {
  props: ['value', 'label'],
};
</script>

<style lang="sass">

</style>
