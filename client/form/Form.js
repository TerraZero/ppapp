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

  static getState(definition, value = {}) {
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

  static getValue(definition, state) {
    const value = {};

    for (const name in definition) {
      const field = definition[name];
      const type = this.getType(field.type);

      if (type === null) continue;

      value[name] = type.getValue(field, state[name]);
    }
    return value;
  }

  /**
   * @typedef {Object} T_MaskItem
   * @property {string} regex
   * @property {string} replace
   */

  /**
   * @param {T_MaskItem[]} mask 
   * @param {string} value 
   * @returns {string}
   */
  static getMask(mask, value) {
    for (const item of mask) {
      value = value.replace(new RegExp(item.regex, 'g'), item.replace);
    }
    return value;
  }

}