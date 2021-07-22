import FormInputType from './FormInputType'

export default class FormInputBoolean extends FormInputType {

  get types() {
    return {
      'checkbox': 'InputCheckbox', 
      'boolean': 'InputCheckbox',
    };
  }

  getTemplate(definition, value, index) {
    if (index === undefined) {
      return (value === undefined ? false : value);
    } else {
      return value && (value[index] === undefined ? false : value[index]) || false;
    }
  }

}