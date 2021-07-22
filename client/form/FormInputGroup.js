import Form from './Form';
import FormInputType from './FormInputType';

export default class FormInputGroup extends FormInputType {

  get types() {
    return {
      'group': 'InputGroup',
    };
  }

  getValue(definition, state) {
    if (definition.cardinality === undefined) {
      return Form.getValue(definition.form, state);
    } else {
      const value = [];
      
      for (const item of state) {
        value.push(Form.getValue(definition.form, item.value));
      }
      return value;
    }
  }

  getTemplate(definition, value, index) {
    if (index === undefined) {
      return Form.getState(definition.form, value || {});
    } else {
      return Form.getState(definition.form, value && value[index] || {});
    }
  }

}