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
      return Form.getValue(this.getItems(definition), state);
    } else {
      const value = [];
      
      for (const item of state) {
        value.push(Form.getValue(this.getItems(definition), item.value));
      }
      return value;
    }
  }

  getItems(definition) {
    return definition.form;
  }

  getTemplate(definition, value, index) {
    if (index === undefined) {
      return Form.getState(this.getItems(definition), value || {});
    } else {
      return Form.getState(this.getItems(definition), value && value[index] || {});
    }
  }

}