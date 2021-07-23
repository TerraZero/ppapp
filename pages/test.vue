<template lang="pug">
  .page-test
    .page-test__content
      InputForm(:form="form", v-model="state", ident="test", @input="input")
      el-button(type="primary", @click="click") Submit
    .page-test__side
      pre.output(v-html="format(state)")
</template>

<script>
import Form from '~/client/form/Form';

const form = {
  key: {
    type: 'string',
    label: 'Key',
    mask: [
      {
        regex: '([^a-z]+)',
        replace: '_',
      }
    ],
  },
  upload: {
    type: 'upload',
    label: 'Upload',
    upload_dir: 'uploads/custom',
  },
  upload_image: {
    type: 'upload',
    cardinality: 0,
    label: 'Upload',
    upload_dir: 'uploads/custom',
    upload: 'image',
  },
  select: {
    type: 'select',
    label: 'Select',
    placeholder: 'Placeholder',
    options: {
      option_0: 'Option 0',
      option_1: 'Option 1',
      option_2: 'Option 2',
    },
  },
  select_multi: {
    type: 'select',
    label: 'Select',
    placeholder: 'Placeholder',
    options: {
      option_0: 'Option 0',
      option_1: 'Option 1',
      option_2: 'Option 2',
    },
    multiple: true,
  },
  radio: {
    type: 'radio',
    label: 'Radio',
    placeholder: 'Placeholder',
    options: {
      option_0: 'Radio 1',
      option_1: 'Radio 2',
      option_2: 'Radio 3',
    },
  },
  number: {
    type: 'number',
    cardinality: 0,
    label: 'Number',
    placeholder: 'Placeholder',
    precision: 2,
    step: 0.1,
    igrid: {
      columns: '1fr 1fr 1fr 1fr',
      gap: '10px',
    }
  },
  textfield: {
    type: 'string',
    label: 'Textfield',
    placeholder: 'Placeholder',
  },
  textfield_2: {
    type: 'string',
    cardinality: 2,
    label: 'Textfield [index] = [count]',
    placeholder: 'Placeholder',
  },
  textfield_0: {
    type: 'string',
    cardinality: 0,
    label: 'Unlimited Textfield [index] = [count]',
    placeholder: 'Placeholder',
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
    label: 'On Boolean',
    off_label: 'Off Boolean',
    border: true,
  },
  boolean_2: {
    type: 'checkbox',
    cardinality: 2,
    label: 'On Boolean [count]',
    off_label: 'Off Boolean [count]',
    border: true,
  },
  boolean_0: {
    type: 'checkbox',
    cardinality: 0,
    label: 'On Boolean Unlimited [count]',
    off_label: 'Off Boolean Unlimited [count]',
    border: true,
  },
  group: {
    type: 'group',
    ggrid: {
      columns: '1fr 1fr',
      gap: '10px',
    },
    form: {
      group_textfield: {
        type: 'string',
        label: 'Group Textfield',
        placeholder: 'Placeholder',
      },
      group_textfield_2: {
        type: 'string',
        label: 'Group Textfield',
        placeholder: 'Placeholder',
        span: 2,
      },
      group_boolean: {
        type: 'checkbox',
        label: 'On Group Boolean',
        off_label: 'Off Group Boolean',
        border: true,
        span: 2,
      },
    },
  },
  group_0: {
    type: 'group',
    label: "Group [count]",
    cardinality: 0,
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
        label: 'Group Textfield [count]',
        placeholder: 'Placeholder',
      },
      group_boolean: {
        type: 'checkbox',
        cardinality: 0,
        label: 'On Group Boolean [count]',
        off_label: 'Off Group Boolean [count]',
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
      return JSON.stringify(Form.getValue(this.form, value), null, 2);
    }
  },
}
</script>

<style lang="sass">
.page-test
  display: grid
  grid-template-columns: 2fr 1fr

  &__side
    padding: 20px
</style>
