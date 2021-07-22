<template lang="pug">
  .page
    .check
      h1 Check State {{ getTest(state_update, state_update_value_reverse) }}
      h1 Check Value {{ getTest(state_update_value, state_update_value_reverse_value) }}
    .tests
      pre.output(v-html="format(state_update)")
      pre.output(v-html="format(state_update_value)")
      pre.output(v-html="format(state_update_value_reverse)")
      pre.output(v-html="format(state_update_value_reverse_value)")
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
    cardinality: 0,
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
  select_multi_0: {
    type: 'select',
    cardinality: 0,
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
        cardinality: 2,
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
        comp: 'InputTextfield',
        label: 'Group Textfield [count]',
        placeholder: 'Placeholder',
        fallback: '',
      },
      group_textfield_0: {
        type: 'string',
        cardinality: 0,
        comp: 'InputTextfield',
        label: 'Group Textfield',
        placeholder: 'Placeholder',
        fallback: '',
        span: 2,
      },
      group_boolean: {
        type: 'checkbox',
        comp: 'InputCheckbox',
        label: 'On Group Boolean [count]',
        off_label: 'Off Group Boolean [count]',
        fallback: false,
        border: true,
      },
    },
  },
};
let state = {
  upload: {
    id: 4,
    path: 'hallo.png',
  },
  upload_image: [
    {
      id: 4,
      path: 'hallo.png',
    },
    {
      id: 4,
      path: 'hallo.png',
    },
  ],
  select: 'option_0',
  select_multi: [
    'option_0',
    'option_1',
  ],
  select_multi_0: [
    [],
    ['option_0'],
    ['option_0', 'option_1'],
  ],
  radio: 'option_0',
  textfield: 'single',
  textfield_2: [
    'multi_1',
    'multi_2',
  ],
  textfield_0: [
    'item 1',
    'item 2',
    'item 3',
  ],
  boolean: true,
  boolean_2: [
    true, 
    false,
  ],
  boolean_0: [
    true, true, true,
  ],
  group: {
    group_textfield: 'hallo',
    group_textfield_2: [
      'item 1',
      'item 2',
    ],
    group_boolean: true,
  },
  group_0: [
    {
      group_textfield: 'Group 1 Item',
      group_textfield_0: [
        'Group 1 Item 1',
        'Group 1 Item 2',
        'Group 1 Item 3',
      ],
      group_boolean: true,
    },
    {
      group_textfield: 'Group 2 Item',
      group_textfield_0: [
        'Group 2 Item 1',
        'Group 2 Item 2',
        'Group 2 Item 3',
      ],
      group_boolean: true,
    },
  ],
};

export default {
  layout: "admin",
  data() {
    const update = Form.getStateUpdate(form, state);
    const value = Form.getValueUpdate(form, update);
    const revers = Form.getStateUpdate(form, value);
    const value_revers = Form.getValueUpdate(form, revers);

    return { 
      form: form,
      state: Form.getState(form, state),
      state_update: update,
      state_update_value: value,
      state_update_value_reverse: revers,
      state_update_value_reverse_value: value_revers,
    };
  },
  methods: {
    getTest(a, b) {
      if (JSON.stringify(a) === JSON.stringify(b)) {
        return 'TRUE';
      } else {
        return 'FALSE';
      }
    },
    format(value) {
      return JSON.stringify(value, null, 2);
    }
  },
}
</script>

<style lang="sass">
.tests
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
</style>
