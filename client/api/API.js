import Axios from 'axios';
import RouteParser from 'route-parser';

export default class API {

  /**
   * @param {string} mount 
   * @returns {API}
   */
  static create(mount) {
    this._instance_api = this._instance_api || {};
    if (this._instance_api[mount] === undefined) {
      this._instance_api[mount] = new API(mount);
    }
    return this._instance_api[mount]
  }

  constructor(mount) {
    this.mount = mount;
    this._routes = null;
    this._menu = null;
  }

  async routes() {
    if (this._routes === null) {
      this._routes = (await this.get('/router/routes')).content.routes;
    }
    return this._routes;
  }

  /**
   * @returns {Object<string, T_MenuItem>}
   */
  async menu() {
    if (this._menu === null) {
      this._menu = (await this.request('router.menu')).content.menu;
    }
    return this._menu;
  }

  /**
   * @typedef {Object} T_MenuItem
   * @property {string} title
   * @property {string} path
   * @property {string} id
   * @property {Object} config
   * @property {string} config.type
   * @property {string} config.icon
   * @property {string} config.category
   * @property {Object<string, T_MenuItem>} items
   */

  /**
   * @param {string} id 
   * @returns {T_MenuItem}
   */
  async getMenuItem(id = null) {
    if (id === null) return await this.menu();
    let menu = await this.menu();
    const parts = id.split('.');
    const last = parts.pop();

    for (const part of parts) {
      menu = menu[part].items;
    }
    return menu[last];
  }

  async getMenuPath(id = null) {
    return (await this.getMenuItem(id)).path;
  }

  async gotoMenuItem(id) {
    this.constructor.router.push('/' + await this.getMenuPath(id));
  }

  /**
   * @param {string} id 
   * @param {string} type
   * @returns {T_MenuItem[]} 
   */
  async getMenuActions(id, type) {
    const item = await this.getMenuItem(id);

    const actions = [];
    for (const action in item.items) {
      if (item.items[action].config === undefined || item.items[action].config.type !== type) continue;
      actions.push(item.items[action]);
    }
    return actions;
  }

  async searchMenuItem(path) {
    if (path.startsWith('/')) path = path.substring(1);
    return this._searchMenuItem(await this.menu(), path);
  }

  /**
   * @param {Object<string, T_MenuItem>} items
   * @param {string} path 
   */
  _searchMenuItem(items, path) {
    for (const name in items) {
      if (items[name].path === path) return items[name];
      if (path.startsWith(items[name].path) && items[name].items !== undefined) {
        return this._searchMenuItem(items[name].items, path);
      }
    }
    return null;
  }

  /**
   * @param {string} route 
   * @param {Object} params 
   * @returns {string}
   */
  async getUrl(route, params = {}) {
    const match = (await this.routes())[route];
    return this.mount + this.toUrl(match.pattern, params);
  }

  /**
   * @param {string} route 
   * @param {Object} params 
   * @param {(Object|undefined|null)} route_data
   */
  async request(route, params = {}, route_data = undefined) {
    const match = (await this.routes())[route];
    const url = this.toUrl(match.pattern, params);

    switch (match.info.type) {
      case 'get':
        return this.get(url, (route_data === undefined ? params : route_data === null ? {} : route_data));
      case 'post':
        return this.post(url, (route_data === undefined ? params : route_data === null ? {} : route_data));
      default:
        break;
    }
  }

  /**
   * @param {string} pattern 
   * @param {Object} params 
   * @returns {string}
   */
  toUrl(pattern, params = {}) {
    return (new RouteParser(pattern)).reverse(params);
  }

  /**
   * @param {string} url 
   * @param {(Object|null)} params
   * @returns {Object}
   */
  async get(url, params = null) {
    return (await Axios.get(this.mount + url, (params ? {params} : {}))).data;
  }

  /**
   * @param {string} url 
   * @param {Object}
   * @returns {Object}
   */
  async post(url, post = {}) {
    return (await Axios.post(this.mount + url, post)).data;
  }

}