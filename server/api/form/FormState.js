import Reflection from 'pencl-kit/src/Util/Reflection';

export default class FormState {

  /**
   * @param {import('./Form').default} form 
   * @param {*} values 
   * @param {import('./Form').T_FormAction} action 
   */
  constructor(form, values = {}, action = null) {
    this.form = form;
    this.values = values;
    this.action = action;
  }

  /**
   * @param {string} key
   * @param {any} fallback
   * @returns {any}
   */
  get(key, fallback) {
    return Reflection.getDeep(this.values, key, fallback);
  }

  /**
   * @param {import('pencl-knex/types').T_FormItem} field 
   * @param {any} fallback
   * @returns {any}
   */
  getValue(field, fallback = null) {
    return Reflection.getDeep(this.values, field.field_ident, fallback);
  }

  /**
   * @param {import('pencl-knex/types').T_FormItem} field 
   * @param {(string|string[])} message 
   * @returns {import('./Form').default}
   */
  error(field, message) {
    if (!Array.isArray(message)) message = [message];
    for (const index in message) {
      message[index] = Reflection.replaceCallback(message[index], (key) => {
        return Reflection.getDeep(field, key);
      });
    }

    this.form.config.errors = this.form.config.errors || {};
    this.form.config.errors[field.field_ident] = message;
    this.form._valid = false;
    return this.form;
  }

}