import PenclGetterDefinitionError from 'pencl-kit/src/Error/Definition/PenclGetterDefinitionError';
import PenclMethodDefinitionError from 'pencl-kit/src/Error/Definition/PenclMethodDefinitionError';
import ResultsFactory from './ResultsFactory';
import FormState from './FormState';
import ClientForm from '../../../client/form/Form';

/**
 * @typedef {Object} T_FormAction
 * @property {string} key
 * @property {string} label
 * @property {T_FormActionConfig} [config]
 */

/**
 * @typedef {Object}  T_FormActionConfig
 * @property {string} [type]
 * @property {boolean} [disabled]
 * @property {string} [icon]
 */

export default class Form {

  /** @returns {string} */
  static get id() {
    throw new PenclGetterDefinitionError(this, 'id');
  }

  /**
   * @param {typeof Form} form
   */
  static addForm(form) {
    if (this._register_form === undefined) {
      this._register_form = {};
    }
    this._register_form[form.id] = form;
  }

  /**
   * @param {string} id 
   * @param {...any} args
   * @returns {Form}
   */
  static getForm(id, ...args) {
    return new this._register_form[id](...args);
  }

  constructor() {
    this._actions = [];
    this._form = null;
    this._valid = false;
    this._info = {};
    this._results = [];
    this._results_bag = null;
    this._index = {};
    this._config = {};
  }

  /** @returns {typeof Form} */
  get definition() {
    return this.constructor;
  }

  get info() {
    return this._info;
  }

  /** @returns {T_FormAction[]} */
  get actions() {
    return this._actions;
  }

  /** @returns {ResultsFactory} */
  get results() {
    if (this._results_bag === null) {
      this._results_bag = new ResultsFactory(this);
    }
    return this._results_bag;
  }

  /** @returns {Object} */
  get config() {
    return this._config;
  }

  /**
   * @param {string} key 
   * @returns {import('pencl-knex/types').T_FormItem}
   */
  getField(key) {
    return this._index[key];
  }

  getResults() {
    return this._results;
  }

  /**
   * @param {Object} info 
   * @returns {this}
   */
  setInfo(info) {
    this._info = info;
    return this;
  }

  /**
   * @param {boolean} rebuild
   * @returns {import('pencl-knex/types').T_Form}
   */
  async doBuild(rebuild = false) {
    if (this._form === null || rebuild) {
      this._form = await this.build({});
      ClientForm.forField(this._form, (field, info) => {
        field.field_ident = info.ident.join('.');
        field.field_id = info.id;
        field.field_parent = (info.ident.pop() && info.ident.join('.'));
        this._index[field.field_ident] = field;
      });
    }
    return this._form;
  }

  /**
   * @param {string} key 
   * @param {string} label 
   * @param {(string|T_FormActionConfig)} config
   * @returns {this}
   */
  addAction(key, label, config = {}) {
    if (typeof config === 'string') {
      config = {
        type: config,
      };
    }
    this._actions.push({
      key, 
      label,
      config,
    });
    return this;
  }

  /**
   * @param {string} type 
   * @param {Object} info 
   * @returns {this}
   */
  addResult(type, info) {
    this._results.push({ type, info });
    return this;
  }

  /**
   * @param {import('pencl-knex/types').T_Form} form
   * @returns {import('pencl-knex/types').T_Form}
   */
  async build(form) {
    throw new PenclMethodDefinitionError(this, 'build');
  }

  /**
   * @param {FormState} state
   */
  async doValidate(state) {
    await this.validate(await this.doBuild(), state);
  }

  /**
   * @param {import('pencl-knex/types').T_Form} form
   * @param {FormState} state
   */
   async validate(form, state) {}

  /**
   * @param {Object} values
   * @param {T_FormAction} action
   */
  async doSubmit(values, action) {
    this._valid = true;
    const state = new FormState(this, values, action);
    await this.doValidate(state);

    if (!this._valid) return;
    await this.submit(await this.doBuild(), state);
  }

  /**
   * @param {import('pencl-knex/types').T_Form} form
   * @param {FormState} state
   */
  async submit(form, state) {}

}