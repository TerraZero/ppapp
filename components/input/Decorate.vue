<template lang="pug">
  .input-decorate
    .input-decorate__inputs(v-if="field.cardinality === undefined")
      label.input-decorate__label(v-if="field.label && !noLabel", :for="ident")
        slot(name="label")
          | {{ field.label }}
      slot(:id="id", :value="value", :ident="ident", :label="getLabel(field.label)")
        | [INPUT]
    .input-decorate__inputs(v-if="field.cardinality !== undefined", :class="field.igrid ? 'input-decorate__inputs--grid' : 'input-decorate__inputs--item'", :style="getStyles()")
      .input-decorate__item(v-for="item, index in value", :key="index")
        label.input-decorate__label(v-if="field.label && !noLabel", :for="ident + '.' + index")
          slot(name="label")
            | {{ getLabel(field.label, index) }}
        transition.input-decorate__input(name="fade", appear)
          slot(:id="id + '-' + index", :ident="ident + '.' + index", :value="item.value", :index="index", :label="getLabel(field.label, index)")
            | [INPUT] {{ index }}
    .input-decorate__actions(v-if="actions && field.cardinality === 0")
      FormButton(v-if="actions.add", type="primary", icon="el-icon-plus", text="New Item", @click.native="$emit('addItem', field.actions && field.actions.add || 1)")
      FormButton(v-if="actions.remove", type="danger", icon="el-icon-delete", text="Delete Item", @click.native="$emit('removeItem', field.actions && field.actions.remove || 1)")
      FormButton(v-if="actions.clean", type="danger", icon="el-icon-magic-stick", text="Clean", @click.native="$emit('cleanItems')")
    .input-decorate__description(v-if="field.description") 
      slot(name="description")
        | {{ field.description }}
</template>

<script>
import Form from '~/client/form/Form';

export default {
  props: ['name', 'field', 'value', 'ident', 'noLabel', 'label', 'actions'],
  data() {
    return {
      id: Form.getUnique(this.name),
    };
  },
  methods: {
    getLabel(label, index) {
      if (this.label) label = this.label;
      return (label || '').replace('[count]', index + 1).replace('[index]', index);
    },
    getStyles() {
      const styles = {};
      if (this.field.igrid) {
        styles.display = 'grid';
        styles['grid-template-columns'] = this.field.igrid.columns;
        if (this.field.igrid.gap) {
          styles['grid-gap'] = this.field.igrid.gap;
        }
      }
      return styles;
    },
  },
};
</script>

<style lang="sass">
.input-decorate
  margin-bottom: 20px

  &__label
    display: block
    margin-bottom: 10px

  &__inputs--item &__item + &__item
    margin-top: 10px

  &__actions
    margin-top: 10px

</style>
