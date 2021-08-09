<template lang="pug">
  .input-decorate(:class="classes")
    .input-decorate__inputs(v-if="field.cardinality === undefined")
      label.input-decorate__label(v-if="field.label && !noLabel", :for="ident")
        slot(name="label")
          | {{ field.label }}
      slot(:id="id", :value="value", :ident="ident", :label="getLabel(field.label)", :disabled="getDisabled()")
        | [INPUT]
    .input-decorate__inputs(v-if="field.cardinality !== undefined", :class="field.igrid ? 'input-decorate__inputs--grid' : 'input-decorate__inputs--item'", :style="getStyles()")
      .input-decorate__item(v-for="item, index in value", :key="index")
        label.input-decorate__label(v-if="field.label && !noLabel", :for="ident + '.' + index")
          slot(name="label")
            | {{ getLabel(field.label, index) }}
        transition.input-decorate__input(name="fade", appear)
          slot(:id="id + '-' + index", :ident="ident + '.' + index", :value="item.value", :index="index", :label="getLabel(field.label, index)", :disabled="getDisabled()")
            | [INPUT] {{ index }}
    .input-decorate__actions(v-if="actions && field.cardinality === 0")
      FormButton(v-if="actions.add", type="primary", icon="el-icon-plus", text="New Item", @click.native="$emit('addItem', field.actions && field.actions.add || 1)")
      FormButton(v-if="actions.remove", type="danger", icon="el-icon-delete", text="Delete Item", @click.native="$emit('removeItem', field.actions && field.actions.remove || 1)")
      FormButton(v-if="actions.clean", type="danger", icon="el-icon-magic-stick", text="Clean", @click.native="$emit('cleanItems')")
    .input-decorate__description(v-if="field.description") 
      slot(name="description", :description="descriptionitems")
        .input-decorate__description-item(v-for="item in descriptionitems") {{ item }}
    .input-decorate__errors(v-if="errors.length")
      .input-decorate__error(v-for="error in errors") 
        i.input-decorate__error-icon.el-icon-error 
        | {{ error }}

</template>

<script>
import Form from '~/client/form/Form';

export default {
  props: ['name', 'field', 'value', 'ident', 'noLabel', 'label', 'actions', 'config'],
  data() {
    return {
      id: Form.getUnique(this.name),
    };
  },
  computed: {
    errors() {
      return this.config.errors && this.config.errors[this.field.field_ident] || [];
    },
    classes() {
      const classes = [];

      if (this.errors.length) {
        classes.push('input-decorate--error');
      }
      return classes;
    },
    descriptionitems() {
      if (Array.isArray(this.field.description)) {
        return this.field.description;
      } else {
        return [this.field.description];
      }
    },
  },
  methods: {
    getDisabled() {
      if (this.field.disabled) return true;
      if (this.field.require) {
        if (this.field.require.mode !== undefined && this.config.mode !== undefined) {
          return this.field.require.mode !== this.config.mode;
        }
      }
      return false;
    },

    getLabel(label, index) {
      if (this.label) label = this.label;
      return (label || '').replace('[count]', index + 1).replace('[index]', index);
    },

    getStyles() {
      const styles = {};
      if (this.field.igrid) {
        styles.display = 'grid';
        if (typeof this.field.igrid === 'number') {
          styles['grid-template-columns'] = 'repeat(' + this.field.igrid + ', 1fr)';
        } else {
          styles['grid-template-columns'] = this.field.igrid;
        }
        styles['grid-gap'] = '10px';
      }
      return styles;
    },
  },
};
</script>

<style lang="sass">
.input-decorate
  padding: 5px

  &--error
    background: #fdc9c9

  &__label
    display: block
    margin-bottom: 10px

  &__inputs--item &__item + &__item
    margin-top: 10px

  &__actions
    margin-top: 10px

  &__description
    font-size: 12px
    color: #909399
    font-style: italic

  &__error
    padding-top: 5px
    color: #F56C6C
    font-size: .8em

  &__error-icon
    padding-right: 10px

</style>
