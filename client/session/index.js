import Reflection from 'pencl-kit/src/Util/Reflection';
import Handler from 'events';

/**
 * @callback C_SessionCallback
 * @param {Session} session
 */

export default class Session {

  /** @returns {Session} */
  static get instance() {
    if (this._session_instance === undefined) {
      this._session_instance = new Session();
    }
    return this._session_instance;
  }

  static get cookie() {
    return this._session_cookie;
  }

  static setCookieAPI(api) {
    this._session_cookie = api;
    if (this._session_instance !== undefined) {
      this._session_instance.load();
    }
  }

  constructor() {
    this._session = null;
    this.handler = new Handler();

    if (Session._session_cookie !== undefined) {
      this.load();
    }
  }

  /**
   * @param {string} event
   * @param {C_SessionCallback} listener 
   * @returns 
   */
  on(event, listener) {
    this.handler.on(event, listener);
    if (event === 'ready' && Session._session_cookie !== undefined) listener(this);
    return this;
  }

  load() {
    this._session = Session.cookie.get('ppapp') || {};
    this.handler.emit('ready', this);
    this.trigger();
  }

  trigger() {
    this.handler.emit('change', this);
    Session.cookie.set('ppapp', this._session);
    return this;
  }

  set(name, value) {
    Reflection.setDeep(this._session, name, value);
    this.trigger();
    return this;
  }

  get(name, fallback = null) {
    return Reflection.getDeep(this._session, name, fallback);
  }

}