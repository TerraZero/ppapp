import Reflection from 'pencl-kit/src/Util/Reflection';
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

  /**
   * @param {import('pencl-knex/types').T_Form} form 
   * @param {Object} value 
   * @returns {Object}
   */
  static getState(form, value = {}) {
    const state = {};

    for (const name in form) {
      const field = form[name];
      const type = this.getType(field.type);

      if (type === null) continue;
      type.prepareDefinition(field);
      
      if (field.mount === undefined) {
        state[name] = type.getState(field, value[name] === undefined ? (field.fallback === undefined ? null : field.fallback) : value[name]);
      } else {
        state[name] = type.getState(field, Reflection.getDeep(value, field.mount, (field.fallback === undefined ? null : field.fallback)));
      }
    }
    return state;
  }

  /**
   * @param {import('pencl-knex/types').T_Form} form 
   * @param {Object} state 
   * @returns {Object}
   */
  static getValue(form, state) {
    const value = {};

    for (const name in form) {
      const field = form[name];
      const type = this.getType(field.type);

      if (type === null) continue;

      if (field.mount === undefined) {
        value[name] = type.getValue(field, state[name]);
      } else {
        Reflection.setDeep(value, field.mount, type.getValue(field, state[name]));
      }
    }
    return value;
  }

  /**
   * @param {import('pencl-knex/types').T_FormMask} mask 
   * @param {string} value 
   * @returns {string}
   */
  static getMask(mask, value) {
    for (const item of mask) {
      value = value.replace(new RegExp(item.regex, 'g'), item.replace);
    }
    return value;
  }

  /**
   * @param {Vue} mount
   * @param {import('../api/API').default} api
   * @param {import('pencl-knex/types').T_Form} form 
   * @param {Object} values 
   * @param {Array} results 
   */
  static doResults(mount, api, form, values, results) {
    const events = [];

    for (const result of results) {
      switch (result.type) {
        case 'message': 
          mount.$message(result.info);
          break;
        case 'notify':
          const notify = mount.$notify({
            customClass: 'el-notification--' + result.info.type,
            onClick: () => {
              notify.close();
            },
            showClose: false,
            ...result.info,
          });
          break;
        case 'event':
          events.push(result.info.event);
          break;
      }
    }

    if (events.length) {
      api.doEvents(events, { mount, api, form, values, results });
    }
  }

  /**
   * @param {import('pencl-knex/types').T_Form} form 
   * @param {function} callback 
   * @param {Object} info
   */
  static forField(form, callback, info = {}) {
    for (const name in form) {
      const field = form[name];
      const type = this.getType(field.type);
      const items = type.getItems(field);

      (info.ident = [...(info.ident || [])]).push(name);
      info.id = name;

      if (items !== null) {
        this.forField(items, callback, info);
      }

      callback(field, info);
    }
  }

}