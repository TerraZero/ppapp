export default class FormInputType {

  /** @returns {Object<string, string>} */
  get types() {}

  prepareDefinition(definition) {
    if (definition.comp === undefined) {
      definition.comp = this.types[definition.type];
    }
  }

  getValue(definition, state) {
    if (definition.cardinality === undefined) {
      return state;
    } else {
      const value = [];
      
      for (const item of state) {
        value.push(item.value);
      }
      return value;
    }
  }

  getState(definition, value) {
    if (definition.cardinality === undefined) {
      return this.getTemplate(definition, value);
    } else if (definition.cardinality === 0) {
      const state = [];
      if (value && value.length) {
        for (let i = 0; i < value.length; i++) {
          state.push({value: this.getTemplate(definition, value, i)});  
        }
      } else {
        state.push({value: this.getTemplate(definition, value)});
      }
      return state;
    } else {
      const state = [];
      for (let i = 0; i < definition.cardinality; i++) {
        state.push({value: this.getTemplate(definition, value, i)});
      }
      return state;
    }
  }

  getTemplate(definition, value, index) {}

}