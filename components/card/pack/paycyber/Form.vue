<template lang="pug">
  .card-pack-paycyber-form 
    EditorInput.card-pack-paycyber-form__field(label="Titel")
      EditorTextfield(:value="value.title", @input="onInput('title', $event)")
    EditorInput.card-pack-paycyber-form__field(label="ID")
      EditorTextfield(:value="value.id", :disabled="true")
    EditorInput.card-pack-paycyber-form__field(label="Wert")
      EditorTextfield(:value="value.value", @input="onInput('value', $event)")
    EditorInput.card-pack-paycyber-form__field(label="Type")
      EditorSelect(:value="value.type", :options="types", @input="onInput('type', $event)")
    EditorInput.card-pack-paycyber-form__field(label="Media Rahmen Abstand")
      EditorTextfield(:value="value.mediaframe", @input="onInput('mediaframe', $event)")
    EditorInput.card-pack-paycyber-form__field(label="Bild")
      EditorMediafield(:value="value.image", @input="onInput('image', $event)")
    EditorInput.card-pack-paycyber-form__field.card-pack-paycyber-form__field--line(label="Line (Type Beschreibung)")
      EditorTextfield(:value="value.line", @input="onInput('line', $event)")
    EditorInput.card-pack-paycyber-form__field.card-pack-paycyber-form__field--line(label="Beschreibung")
      EditorTextarea(:value="value.description", @input="onInput('description', $event)")
    EditorInput.card-pack-paycyber-form__field(label="Schaden Würfel")
      EditorSelect(:value="value.damage_dice", :options="damage_disces", @input="onInput('damage_dice', $event)")
    EditorInput.card-pack-paycyber-form__field(label="Schaden")
      EditorTextfield(:value="value.damage", @input="onInput('damage', $event)")
    EditorInput.card-pack-paycyber-form__field(label="Munition")
      EditorTextfield(:value="value.muni", @input="onInput('muni', $event)")
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      types: {
        'weapon.svg': 'Waffe',
        'melee.svg': 'Nahkampf',
        'weaponmod.svg': 'Waffenmod',
      },
      damage_disces: {
        d4: 'D4',
        d6: 'D6',
        d8: 'D8',
        d12: 'D12',
        d20: 'D20',
      },
    };
  },
  methods: {
    onInput(index, value) {
      this.value[index] = value;
      this.$emit('input', this.value);
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="sass">
.card-pack-paycyber-form
  display: flex
  flex-wrap: wrap

  &__field
    width: 50%
  
  &__field + &__field
    margin-top: 0

  &__field--line
    width: 100%

</style>
