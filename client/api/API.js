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
  }

  async routes() {
    if (this._routes === null) {
      this._routes = (await this.get('/router/routes')).content.routes;
    }
    return this._routes;
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