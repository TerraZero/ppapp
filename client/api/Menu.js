import MenuInfo from '~/server/info/menu.json';
import MenuItem from './MenuItem';
import API from './API';
import Reflection from 'pencl-kit/src/Util/Reflection';
import RouteParser from 'route-parser';
import System from '../system';

/**
 * @typedef {Object} T_MenuItem
 * @property {string} id
 * @property {string} title
 * @property {string} path
 * @property {string} [parent]
 * @property {string} [action]
 * @property {string} [generate]
 * @property {string} [live]
 * @property {string} [type]
 * @property {(string|false)} [menu]
 * @property {(string|false)} [breadcrumb]
 * @property {(string|boolean)} [danger]
 * @property {Object<string, T_MenuValidate} [validate]
 * @property {Object<string, T_MenuTreeItem>} [tree]
 */

/**
 * @typedef {Object} T_MenuValidate
 * @property {string} type
 * @property {Object<string, Object>} [options]
 */

/**
 * @typedef {Object} T_MenuTreeItem
 * @property {string} title generated title
 * @property {string} breadcrumb generated breadcrumb
 * @property {string} action generated action
 * @property {string} path generated path
 * @property {string} id generated id
 * @property {Object} generatedata
 * @property {T_MenuItem} item
 * @property {Object<string, T_MenuTreeItem>} [items]
 */

export default class Menu {

  /**
   * @returns {API}
   */
  static create() {
    if (this._instance_menu === undefined) {
      this._instance_menu = new Menu();
    }
    return this._instance_menu;
  }

  constructor() {
    this._tree = null;
    this._tree_index = {};
    this._api = API.create('/api');
    this.logger = System.logger('Menu');
    this.trigger = System.trigger(this);
  }

  /** @returns {T_MenuItem[]} */
  get items() {
    return MenuInfo;
  }

  /**
   * @param {string} id 
   * @returns {T_MenuItem}
   */
  item(id) {
    return this.items.find(v => v.id === id);
  }

  /**
   * @param {boolean} rebuild
   * @returns {Object<string, T_MenuTreeItem>}
   */
  async getTree(rebuild = false) {
    if (this._tree === null || rebuild) {
      const generate = (await this._api.request('menu.generate')).content;

      this._tree = {};
      this._tree_index = {};
      if (rebuild) {
        for (const item of this.items) {
          delete item.tree;
        }  
      }
      for (const item of this.items) {
        if (item.menu === false) continue;
        this._buildTree(item, generate);
      }
    }
    await this.trigger('menu.tree');
    return this._tree;
  }

  /**
   * @param {T_MenuItem} item
   * @param {Object} generate
   */
  _buildTree(item, generate) {
    if (item.tree === undefined) {
      item.tree = {};
      if (item.generate === undefined) {
        item.tree[item.id] = {
          title: item.menu || item.title,
          action: item.action === false ? false : item.action || item.menu || item.title,
          breadcrumb: item.breadcrumb === false ? false : item.breadcrumb || item.menu || item.title,
          path: item.path,
          id: item.id,
          item: item,
        };
        this._tree_index[item.id] = item.tree[item.id];

        if (item.parent === undefined) {
          this._tree[item.id] = item.tree[item.id];
        } else {
          const parent = this._tree_index[item.parent];
          if (parent === undefined) this._buildTree(parent, generate);
          parent.items = parent.items || {};
          parent.items[item.id] = item.tree[item.id];
        }
      } else {
        for (const data of generate[item.generate]) {
          const contextitem = {
            title: Reflection.replaceCallback(item.menu || item.title, (field) => Reflection.getDeep(data, field)),
            action: item.action === false ? false : Reflection.replaceCallback(item.action || item.menu || item.title, (field) => Reflection.getDeep(data, field)),
            breadcrumb: item.breadcrumb === false ? false : Reflection.replaceCallback(item.breadcrumb || item.menu || item.title, (field) => Reflection.getDeep(data, field)),
            path: (new RouteParser(item.path)).reverse(data.encoded),
            id: item.id + '.' + item.generate.split('.').map((v) => {
              return data.encoded[v];
            }).join('.'),
            item: item,
            generatedata: data,
          };
          item.tree[contextitem.id] = contextitem;
          this._tree_index[contextitem.id] = contextitem;

          const parentid = Reflection.replaceCallback(item.parent, (field) => Reflection.getDeep(data, field));
          const parent = this._tree_index[parentid];
          if (parent === undefined) this._buildTree(parent, generate);
          parent.items = parent.items || {};
          parent.items[contextitem.id] = contextitem;
        }
      }
    }
  }

  /**
   * @param {string} id 
   * @returns {MenuItem}
   */
  getItem(id) {
    const item = this.item(id);
    if (item.item === undefined) item.item = new MenuItem(item);
    return item.item;
  }

  /**
   * @param {string} id 
   * @param {Object<string, string>} params 
   */
  goto(id, params = {}) {
    if (this._tree_index[id] !== undefined) {
      System.router.push('/' + this._tree_index[id].path);
    } else {
      System.router.push('/' + (new RouteParser(this.item(id).path).reverse(params)));
    }
  }

  /**
   * @returns {T_MenuItem}
   */
  current() {
    const path = System.route.path.substring(1);
    const params = this.params();
    
    for (const item of this.items) {
      if (path === (new RouteParser(item.path)).reverse(params)) return item;
    }
    this.logger.warning({
      message: 'The current menu point could not be found.',
      context: { path, params },
    });
    return null;
  }

  params() {
    return System.route.params;
  }

  /**
   * @param {T_MenuItem} item
   */
  async getParam(item, param) {
    if (item.generate === undefined && item.live === undefined) {
      return item[param];
    } else if (typeof item.live === 'string') {
      const params = this.params();
      const live = (await this._api.request('menu.live', {}, {live: item.live, ...params})).content;

      return Reflection.replaceCallback(item[param], (v) => {
        return Reflection.getDeep(live, v);
      });
    } else {
      const params = this.params();
      const generate = (await this._api.request('menu.generate')).content;
      const data = generate[item.generate].find((v) => {
        for (const index in params) {
          if (v.encoded[index] !== params[index]) return false;
        }
        return true;
      });

      return Reflection.replaceCallback(item[param], (v) => {
        return Reflection.getDeep(data, v);
      });
    }
  }

  async getBreadcrumb(route) {
    const path = route.path.substring(1);
    const items = [];
    const parts = path.split('/');
    const search = [];
    const breadcrumb = route.matched[0].components.default.options.breadcrumb;
    const current = this.current();

    while (parts.length) {
      search.push(parts.shift());
      for (const index in this._tree_index) {
        const item = this._tree_index[index];

        if (item.path === search.join('/')) {
          items.push(item);
          break;
        }
      }
    }
    
    if (typeof breadcrumb === 'string') {
      items.push({
        id: null,
        breadcrumb: breadcrumb,
      });
    } else if (typeof breadcrumb === 'function') {
      items.push({
        id: null,
        breadcrumb: await breadcrumb(System),
      });
    } else if (current !== null && current.breadcrumb !== false && items[items.length - 1].item.path !== current.path) {
      if (current.live === undefined) {
        items.push({
          id: current.id,
          breadcrumb: current.breadcrumb || current.menu || current.title,
        });
      } else {
        const params = this.params();
        const live = (await this._api.request('menu.live', {}, {live: current.live, ...params})).content;

        items.push({
          id: current.id,
          breadcrumb: Reflection.replaceCallback(current.breadcrumb || current.menu || current.title, (field) => Reflection.getDeep(live, field)),
        });
      }
    }
    return items;
  }

}