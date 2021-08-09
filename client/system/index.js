import PromiseEvents from 'promise-events';
import Logger from './Logger';

export default class System {

  static get instance() {
    if (this._system_instance === undefined) {
      this._system_instance = new System();
    }
    return this._system_instance;
  }

  static get app() {
    return this.context.app;
  }

  static get router() {
    return this.app.router;
  }

  static get route() {
    return this.context.route;
  }

  static get params() {
    return this.route.params;
  }

  static get store() {
    return this.context.store;
  }

  static get axios() {
    return this.context.$axios;
  }

  static get redirect() {
    return this.context.redirect;
  }

  static get page() {
    return this.route.matched[0].components.default;
  }

  /**
   * @param {string} channel 
   * @returns {Logger}
   */
  static logger(channel) {
    return new Logger(channel, this);
  }

  static trigger(context) {
    return async (event, ...args) => {
      System.instance.handler.emit(event, ...args, context);
    };
  }

  constructor() {
    this.handler = new PromiseEvents();
  }

}