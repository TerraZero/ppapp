import FormInputType from './FormInputType'

export default class FormInputTextfield extends FormInputType {

  get types() {
    return {
      'string': 'InputTextfield', 
      'number': 'InputNumber',
    };
  }

  getTemplate(definition, value, index) {
    if (index === undefined) {
      return value || '';
    } else {
      return value && value[index] || '';
    }
  }

}