import FormInputType from './FormInputType'

export default class FormInputUpload extends FormInputType {

  get types() {
    return {
      'upload': 'InputUpload',
    };
  }

  getValue(definition, state) {
    if (definition.cardinality === undefined) {
      return state && state[0] || null;
    } else {
      const value = [];
      
      for (const item of state) {
        value.push(item.value[0]);
      }
      return value;
    }
  }

  getTemplate(definition, value, index) {
    if (index === undefined) {
      if (value) {
        return [value];
      }
      return [];
    } else {
      return value && value[index] || [];
    }
  }

}