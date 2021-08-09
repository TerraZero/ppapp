import { Notification } from 'element-ui';

/**
 * @typedef {Object} T_Log
 * @property {string} type
 * @property {string[]} message
 * @property {string} channel
 * @property {string} title
 * @property {boolean} silent
 * @property {boolean} store
 * @property {boolean} multi
 * @property {boolean} isNew
 * @property {(number|string)} [id]
 * @property {(Error|string)} [error]
 * @property {Object} [context]
 */

export default class Logger {

  static get TYPE_ERROR() {
    return 'error';
  }

  static get TYPE_WARNING() {
    return 'warning';
  }

  static get TYPE_SUCCESS() {
    return 'success';
  }

  static get TYPE_INFO() {
    return 'info';
  }

  /**
   * @param {string} channel 
   * @param {typeof import('./index').default} system 
   */
  constructor(channel, system) {
    this.channel = channel;
    this.system = system;

    this._register = {};
  }

  /**
   * @param {string} type
   * @param {T_Log} log
   * @returns {T_Log}
   */
  create(type, log) {
    log.type = type;
    log.channel = this.channel;
    if (log.isNew === undefined) {
      log.isNew = true;
    }
    if (log.multi === undefined) {
      log.multi = false;
    }
    if (!log.message && log.error) {
      log.message = [log.error.message];
    }
    if (!Array.isArray(log.message)) {
      log.message = [log.message];
    }
    if (!log.title) {
      log.title = log.message.shift();
    }
    if (log.store === undefined) {
      log.store = true;
    }
    if (log.silent === undefined) {
      log.silent = false;
    }
    return log;
  }

  /**
   * @param {T_Log} log
   */
  async execute(log) {
    switch (log.type) {
      case Logger.TYPE_ERROR:
        console.error('[' + log.channel.toUpperCase() + ']: ' + log.title);
        for (const note of log.message) {
          console.error(note);
        }
        console.error(log.error + '');
        if (log.context !== undefined) {
          console.error('##############################\n' + JSON.stringify(log.context, null, 2) + '\n##############################');
        }
        break;
      case Logger.TYPE_WARNING:
        console.warn('[' + log.channel.toUpperCase() + ']: ' + log.title);
        for (const note of log.message) {
          console.warn(note);
        }
        break;
      case Logger.TYPE_SUCCESS:
        console.log('[' + log.channel.toUpperCase() + ']: ' + log.title);
        for (const note of log.message) {
          console.log(note);
        }
        break;
      case Logger.TYPE_INFO:
        break;
    }
    await this.system.store.dispatch('logs/add', log);
    
    if (!log.silent) {
      const id = log.title + log.type;

      if (log.multi || this._register[id] === undefined) {
        const notify = Notification[log.type]({
          title: '[' + log.channel.toUpperCase() + ']: ' + log.title,
          message: log.message.join('\n'),
          duration: 0, //(log.type === Logger.TYPE_ERROR ? 0 : undefined),
          customClass: 'el-notification--' + log.type,
          onClick: () => {
            delete this._register[id];
            notify.close();
            this.system.router.push('/admin/system/logs/' + log.id);
          },
          onClose: () => {
            delete this._register[id];
          },
        });

        this._register[log.title + log.type] = {
          notify,
        };
      }
    }
    return log;
  }

  /**
   * @param {(T_Log|string|Error)} log
   * @returns {T_Log}
   */
  error(log = {}) {
    if (typeof log === 'string') {
      log = {
        message: [log],
      };
    } else if (log instanceof Error) {
      log = {
        error: log,
      };
    }
    return this.execute(this.create(Logger.TYPE_ERROR, log));
  }

  /**
   * @param {(T_Log|string|Error)} log
   * @returns {T_Log}
   */
  warning(log = {}) {
    if (typeof log === 'string') {
      log = {
        message: [log],
      };
    } else if (log instanceof Error) {
      log = {
        error: log,
      };
    }
    return this.execute(this.create(Logger.TYPE_WARNING, log));
  }

  /**
   * @param {(T_Log|string)} log
   * @returns {T_Log}
   */
  success(log = {}) {
    if (typeof log === 'string') {
      log = {
        message: [log],
      };
    }
    return this.execute(this.create(Logger.TYPE_SUCCESS, log));
  }

  /**
   * @param {(T_Log|string)} log
   * @returns {T_Log}
   */
  info(log = {}) {
    if (typeof log === 'string') {
      log = {
        message: [log],
      };
    }
    return this.execute(this.create(Logger.TYPE_INFO, log));
  }

}