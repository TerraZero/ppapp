<template lang="pug">
  .page
    .page__content
      InputForm(:form="form", v-model="state", ident="test", @input="input")
      el-button(type="primary", @click="click") Submit
    .page__side
      pre.output(v-html="format(state)")
</template>

<script>
import Form from '~/client/form/Form';

const form = {
  upload: {
    type: 'upload',
    comp: 'InputUpload',
    label: 'Upload',
    fallback: [],
    upload_dir: 'uploads/custom',
  },
  upload_image: {
    type: 'upload',
    comp: 'InputUpload',
    label: 'Upload',
    fallback: [],
    upload_dir: 'uploads/custom',
    upload: 'image',
  },
  select: {
    type: 'select',
    comp: 'InputSelect',
    label: 'Select',
    placeholder: 'Placeholder',
    options: {
      option_0: 'Option 0',
      option_1: 'Option 1',
      option_2: 'Option 2',
    },
    fallback: '',
  },
  select_multi: {
    type: 'select',
    comp: 'InputSelect',
    label: 'Select',
    placeholder: 'Placeholder',
    options: {
      option_0: 'Option 0',
      option_1: 'Option 1',
      option_2: 'Option 2',
    },
    multiple: true,
    fallback: [],
  },
  radio: {
    type: 'radio',
    comp: 'InputRadio',
    label: 'Radio',
    placeholder: 'Placeholder',
    options: {
      option_0: 'Radio 1',
      option_1: 'Radio 2',
      option_2: 'Radio 3',
    },
    fallback: '',
  },
  number: {
    type: 'number',
    cardinality: 0,
    comp: 'InputNumber',
    label: 'Number',
    placeholder: 'Placeholder',
    fallback: '',
    precision: 2,
    step: 0.1,
    igrid: {
      columns: '1fr 1fr 1fr 1fr',
      gap: '10px',
    }
  },
  textfield: {
    type: 'string',
    comp: 'InputTextfield',
    label: 'Textfield',
    placeholder: 'Placeholder',
    fallback: '',
  },
  textfield_2: {
    type: 'string',
    cardinality: 2,
    comp: 'InputTextfield',
    label: 'Textfield [index] = [count]',
    placeholder: 'Placeholder',
    fallback: '',
  },
  textfield_0: {
    type: 'string',
    cardinality: 0,
    comp: 'InputTextfield',
    label: 'Unlimited Textfield [index] = [count]',
    placeholder: 'Placeholder',
    fallback: '',
    igrid: {
      columns: '1fr 1fr',
      gap: '10px',
    },
    actions: {
      add: 2,
      remove: 2,
    },
  },
  boolean: {
    type: 'checkbox',
    comp: 'InputCheckbox',
    label: 'On Boolean',
    off_label: 'Off Boolean',
    fallback: false,
    border: true,
  },
  boolean_2: {
    type: 'checkbox',
    cardinality: 2,
    comp: 'InputCheckbox',
    label: 'On Boolean [count]',
    off_label: 'Off Boolean [count]',
    fallback: false,
    border: true,
  },
  boolean_0: {
    type: 'checkbox',
    cardinality: 0,
    comp: 'InputCheckbox',
    label: 'On Boolean Unlimited [count]',
    off_label: 'Off Boolean Unlimited [count]',
    fallback: false,
    border: true,
  },
  group: {
    type: 'group',
    comp: 'InputGroup',
    ggrid: {
      columns: '1fr 1fr',
      gap: '10px',
    },
    form: {
      group_textfield: {
        type: 'string',
        comp: 'InputTextfield',
        label: 'Group Textfield',
        placeholder: 'Placeholder',
        fallback: '',
      },
      group_textfield_2: {
        type: 'string',
        comp: 'InputTextfield',
        label: 'Group Textfield',
        placeholder: 'Placeholder',
        fallback: '',
        span: 2,
      },
      group_boolean: {
        type: 'checkbox',
        comp: 'InputCheckbox',
        label: 'On Group Boolean',
        off_label: 'Off Group Boolean',
        fallback: false,
        border: true,
        span: 2,
      },
    },
  },
  group_0: {
    type: 'group',
    label: "Group [count]",
    cardinality: 0,
    comp: 'InputGroup',
    igrid: {
      columns: '1fr 1fr',
      gap: '10px',
    },
    actions: {
      add: 2,
      remove: 2,
    },
    form: {
      group_textfield: {
        type: 'string',
        cardinality: 0,
        comp: 'InputTextfield',
        label: 'Group Textfield [count]',
        placeholder: 'Placeholder',
        fallback: '',
      },
      group_boolean: {
        type: 'checkbox',
        cardinality: 0,
        comp: 'InputCheckbox',
        label: 'On Group Boolean [count]',
        off_label: 'Off Group Boolean [count]',
        fallback: false,
        border: true,
      },
    },
  },
};
const state = {};

export default {
  layout: "admin",
  data() {
    return { 
      form: form,
      state: Form.getState(form, state),
    };
  },
  methods: {
    click() {
      
    },
    input(value) {
    },
    format(value) {
      return JSON.stringify(value, null, 2);
    }
  },
}
</script>

<style lang="sass">
.page
  display: grid
  grid-template-columns: 2fr 1fr

  &__side
    padding: 20px
</style>
