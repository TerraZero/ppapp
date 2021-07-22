import Widgets from '~/server/info/widgets.json';
import FormInputTextfield from './FormInputTextfield';
import FormInputBoolean from './FormInputBoolean';
import FormInputList from './FormInputList';
import FormInputUpload from './FormInputUpload';
import FormInputGroup from './FormInputGroup';

export default class Form {

  /**
   * @param {string} type 
   * @returns {import('./FormInputType').default}
   */
  static getType(type) {
    if (this._types === undefined) {
      this._types = [];
      this._types.push(new FormInputTextfield());
      this._types.push(new FormInputBoolean());
      this._types.push(new FormInputList());
      this._types.push(new FormInputUpload());
      this._types.push(new FormInputGroup());
    }
    for (const inputtype of this._types) {
      if (inputtype.types[type] !== undefined) {
        return inputtype;
      }
    }
    return null;
  }

  static getUnique(name) {
    this._instance_form = this._instance_form || {};
    if (this._instance_form[name] === undefined) {
      this._instance_form[name] = 0;
      return name;
    } else {
      this._instance_form[name]++;
      return name + '-' + this._instance_form[name];
    }
  }

  static getComponent(field) {
    return field.comp || Widgets.defaults[field.type] || 'InputTextfield';
  }

  static getState(form, state = {}) {
    const values = {};

    for (const field in form) {
      if (form[field].cardinality !== undefined) {
        values[field] = [];
        if (form[field].cardinality === 0) {
          if (Array.isArray(state[field]) && state[field].length) {
            for (let i = 0; i < state[field].length; i++) {
              if (form[field].type === 'group') {
                values[field].push({value: this.getState(form[field].form, state[field][i].value || {})});
              } else {
                values[field].push({value: this.getFallback(form[field], state[field][i].value)});
              }
            }
          } else {
            values[field].push({value: this.getFallback(form[field], state[field])});
          }
        } else {
          for (let i = 0; i < form[field].cardinality; i++) {
            values[field].push({value: state[field] !== undefined && state[field][i].value || this.getFallback(form[field])});
          }
        }
      } else {
        values[field] = this.getFallback(form[field], state[field]);
      }
    }
    return values;
  }

  static getFallback(field, state) {
    if (field.type === 'group') {
      return this.getState(field.form, state || {});
    } else if (state !== undefined) {
      return state;
    } else if (field.fallback !== undefined) {
      return field.fallback;
    } else {
      return null;
    }
  }

  static getValueUpdate(definition, state) {
    const value = {};

    for (const name in definition) {
      const field = definition[name];
      const type = this.getType(field.type);

      if (type === null) continue;

      value[name] = type.getValue(field, state[name]);
    }
    return value;
  }

  static getStateUpdate(definition, value) {
    const state = {};

    for (const name in definition) {
      const field = definition[name];
      const type = this.getType(field.type);

      if (type === null) continue;
      type.prepareDefinition(field);
      
      state[name] = type.getState(field, value[name]);
    }
    return state;
  }

}