import Axios from 'axios';
import RouteParser from 'route-parser';
import PromiseEvents from 'promise-events';
import Reflection from 'pencl-kit/src/Util/Reflection';
import System from '../system';

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
    this.trigger = System.trigger(this);

    this._routes = null;

    System.instance.handler.on('rebuild', async ({ rebuild }) => {
      if (rebuild.routes) {
        this._routes = null;
      }
    });
    this.logger = System.logger('API');
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
    return {};
  }

  /**
   * @typedef {Object} T_MenuItem
   * @property {string} title
   * @property {string} [path]
   * @property {string} [pattern]
   * @property {string} id
   * @property {Object} config
   * @property {string} config.type
   * @property {string} config.icon
   * @property {string} config.category
   * @property {Object} config.load
   * @property {string} config.load.request
   * @property {Object} config.load.params
   * @property {boolean} config.hide
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
    return menu[last] || null;
  }

  getCurrentRoute() {
    return this.constructor.store.state.menu.route;
  }

  async getCurrentMenuItem() {
    if (this.constructor.store.state.menu.current === null) {
      const path = this.getCurrentRoute().path;

      return await this.searchMenuItem(path);
    } else {
      return this.constructor.store.state.menu.current;
    }
  }

  async getMenuParams(id = null) {
    if (id === null) id = (await this.getCurrentMenuItem()).id;
    const item = await this.getMenuItem(id);

    if (typeof item.pattern === 'string') {
      const pattern = new RouteParser(item.pattern);

      return pattern.match(this.getCurrentRoute().path.substring(1));
    }
    return {};
  }

  async getMenuPath(id = null, params = null) {
    const item = await this.getMenuItem(id);

    if (typeof item.pattern === 'string') {
      if (params === null) params = await this.getMenuParams(id);
      const pattern = new RouteParser(item.pattern);
      return pattern.reverse(params);
    }
    return item.path;
  }

  async gotoMenuItem(id, params = {}) {
    this.constructor.router.push('/' + await this.getMenuPath(id, params));
  }

  async gotoParent(id = null) {
    if (id === null) id = this.constructor.store.state.menu.current.id;
    const parts = id.split('.');
    parts.pop();
    await this.gotoMenuItem(parts.join('.'));
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

  async getMenuTitle(id = null) {
    if (id === null) id = (await this.getCurrentMenuItem()).id;
    const item = await this.getMenuItem(id);

    if (item === null) return null;
    if (item.config.load) {
      let params = item.config.load.params || {};
      if (item.pattern !== undefined) {
        params = Reflection.merge(await this.getMenuParams(id), params);
      }
      const content = (await this.request(item.config.load.request, params)).content;
      return Reflection.replaceCallback(item.title, (match) => {
        return Reflection.getDeep(content, match);
      });
    } else {
      return item.title || null;
    }
  }

  /**
   * @param {Object<string, T_MenuItem>} items
   * @param {string} path 
   */
  _searchMenuItem(items, path) {
    for (const name in items) {
      if (typeof items[name].pattern === 'string') {
        const pattern = new RouteParser(items[name].pattern);

        if (pattern.match(path)) {
          if (items[name].items !== undefined) {
            const check = this._searchMenuItem(items[name].items, path);
            if (check !== null) return check;
          }
          return items[name];
        }
      }
      if (items[name].path === path) return items[name];
      if (items[name].items !== undefined) {
        const check = this._searchMenuItem(items[name].items, path);
        if (check !== null) return check;
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

    let response = null;
    switch (match.info.type) {
      case 'get':
        response = await this.get(url, (route_data === undefined ? params : route_data === null ? {} : route_data));
        break;
      case 'post':
        response = await this.post(url, (route_data === undefined ? params : route_data === null ? {} : route_data));
        break;
      default:
        break;
    }

    if (response && response.meta.error) {
      this.logger.error({
        message: response.meta.error.message,
        error: response.meta.error.full,
        context: {route, params, route_data},
      });
      return null;
    }

    if (response && response.meta.events) {
      await this.doEvents(response.meta.events, { response });
    }

    return response;
  }

  async doEvents(events, info = {}) {
    for (const event of events) {
      await this.trigger(event.shift(), info, ...event);
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