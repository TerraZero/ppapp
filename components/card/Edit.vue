<template lang="pug">
  .card-edit
    .card-edit__left(@click="onAction(null, 'close')")
      CardDisplay.card-edit__card(ref="display", :card="value", :key="JSON.stringify(value)")
    .card-edit__right
      EditorInput(label="Pack")
        EditorSelect(:value="value.pack", :options="packs", @input="onInput('pack', $event)")
      component(ref="form", v-if="value.pack", :is="formcomponent", :key="value.pack", :value="value", @input="onInput('#', $event)")
    .card-edit__sidebar
      EditorActions.editor-card__actions(:actions="actions", @click="onAction")
    EditorModal(v-if="modal")
      EditorModalOptions(:title="modal.title", :actions="modal.actions", :type="modal.type", @action="onModal") {{ modal.message }}
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      modal: null,
      packs: {
        none: 'None',
        paycyber: 'PayCyber',
        morriton: 'Morriton',
      },
    };
  },
  computed: {
    formcomponent() {
      if (this.value.pack) {
        return 'CardPack' + this.value.pack.substring(0, 1).toUpperCase() + this.value.pack.substring(1) + 'Form';
      }
      return null;
    },
    actions() {
      const actions = {
        close: {
          icon: 'close',
        },
      };

      if (this.value.new) {
        actions.add = {
          icon: 'check',
          type: 'primary',
        };
      } else {
        actions.delete = {
          icon: 'delete',
          type: 'danger',
        };
      }
      return actions;
    },
  },
  methods: {
    onAction(action, id) {
      switch (id) {
        case 'delete':
          this.modal = {
            type: 'warning',
            title: 'Karte löschen?',
            message: 'Wollen Sie wirklich diese Karte löschen?',
            actions: {
              delete: {
                type: 'danger',
                text: 'Löschen',
              },
              abort: {
                text: 'Abbrechen',
              },
            },
          };
          break;
        default:
          this.$emit('control', id);
          break;
      }
    },
    onModal(action, id) {
      this.modal = null;
      if (id === 'abort') return;
      this.$emit('control', id);
    },
    onInput(index, value) {
      if (index === '#') {
        this.$emit('input', value);
      } else {
        this.value[index] = value;
        this.$emit('input', this.value);
      }
      this.$forceUpdate();
    },
  },
}
</script>

<style lang="sass">
body
  --editor-select--background: #{colors(editor, formfield)}
  --editor-select--background-hover: #{colors(editor, formfield-hover)}
  color: white

.card-edit
  +layout__full
  background: colors(editor, sidebar)
  display: flex
  box-shadow: 0 -.5em 1em colors(editor, border)

  &__left
    width: 20%
    min-width: 10cm
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer

  &__right
    +editor__border-left
    width: 80%
    background: colors(editor, background)
    color: white
    padding: 1em
    --editor-input--label--background: #{colors(editor, formframe)}
    --editor-select--background: #{colors(editor, formfield)}
    --editor-textfield--background: #{colors(editor, formfield)}
    --editor-textfield--background-disabled: #{colors(editor, formfield-disabled)}

  &__card
    box-shadow: 0 0 1em 1em colors(editor, border)

  &__sidebar
    min-width: 4em
    flex: 0
    background: colors(editor, sidebar)
    +editor__border-left
</style>
