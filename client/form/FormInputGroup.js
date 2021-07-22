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
      return Form.getValueUpdate(definition.form, state);
    } else {
      const value = [];
      
      for (const item of state) {
        value.push(Form.getValueUpdate(definition.form, item.value));
      }
      return value;
    }
  }

  getTemplate(definition, value, index) {
    if (index === undefined) {
      return Form.getStateUpdate(definition.form, value || {});
    } else {
      console.log(value);
      return Form.getStateUpdate(definition.form, value && value[index] || {});
    }
  }

}