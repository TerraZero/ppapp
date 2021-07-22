import FormInputType from './FormInputType'

export default class FormInputTextfield extends FormInputType {

  get types() {
    return {
      'radio': 'InputRadio', 
      'select': 'InputSelect',
    };
  }

  getTemplate(definition, value, index) {
    const fallback = definition.multiple ? [] : '';
    
    if (index === undefined) {
      return value || fallback;
    } else {
      return value && value[index] || fallback;
    }
  }

}