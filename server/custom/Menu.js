import MenuData from '../info/menu.json';
import Knex from 'pencl-knex';

export default class Menu {

  static async instance() {
    if (this._menu_instance === undefined) {
      this._menu_instance = new Menu();
      await this._menu_instance.init();
    }
    return this._menu_instance;
  }

  constructor() {
    this._init = false;
    this.items = MenuData;
  }

  async init() {
    if (this._init === true) return;
    await this.generateContent();
    await this.generateSchema();
  }

  /**
   * @typedef {Object} T_MenuConfig
   * @property {string} type
   * @property {string} icon
   * @property {string} category
   */

  /**
   * @param {string} menu 
   * @param {string} item 
   * @param {string} title 
   * @param {string} path
   * @param {T_MenuConfig} config 
   */
  addItem(menu, item, title, path, config = {}) {
    let items = this.items;

    for (const part of menu.split('.')) {
      if (items[part].items === undefined) {
        items[part].items = {};
      }
      items = items[part].items;
    }

    items[item] = {
      title: title,
      path: path,
      id: menu + '.' + item,
      config: config,
    };
  }

  async generateContent() {
    /** @type {import('pencl-knex/src/SchemaManager')} */
    const Schemas = Knex().schemas;

    const entities = {};
    for (const entity of Schemas.getEntities()) {
      if (entities[entity.get('entity')] === undefined) {
        entities[entity.get('entity')] = Schemas.getEntityType(entity.get('entity'));
        this.addItem('content', entity.get('entity'), entities[entity.get('entity')].label, 'admin/content/' + entity.get('entity'));
      }
      this.addItem('content.' + entity.get('entity'), entity.get('bundle'), 'New ' + entity.get('label'), 'admin/content/' + entity.get('entity') + '/new/' + entity.get('bundle'));
    }
  }

  async generateSchema() {
    /** @type {import('pencl-knex/src/SchemaManager')} */
    const Schemas = Knex().schemas;

    const entities = {};
    for (const entity of Schemas.getEntities()) {
      if (entities[entity.get('entity')] === undefined) {
        entities[entity.get('entity')] = Schemas.getEntityType(entity.get('entity'));
        this.addItem('schema', entity.get('entity'), entities[entity.get('entity')].label, 'admin/schema/' + entity.get('entity'));
        this.addItem('schema.' + entity.get('entity'), 'create', 'Create ' + entities[entity.get('entity')].label + ' Bundle', 'admin/schema/' + entity.get('entity') + '/create', {type: 'action', icon: 'el-icon-plus'});
      }
      this.addItem('schema.' + entity.get('entity'), entity.get('bundle'), entity.get('label'), 'admin/schema/' + entity.get('entity') + '/' + entity.get('bundle'));
    }
  }

}