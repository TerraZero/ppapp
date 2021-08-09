export default class ResultsFactory {

  /**
   * @param {import('./Form').default} form
   */
  constructor(form) {
    this.form = form;
  }

  /**
   * @param {string} title 
   * @param {string} message 
   * @param {Object} config 
   * @returns {this} 
   */
  info(title, message, config = {}) {
    this.form.addResult('notify', {
      type: 'info',
      title,
      message,
      ...config,
    });
    return this;
  }

  /**
   * @param {string} title 
   * @param {string} message 
   * @param {Object} config 
   * @returns {this} 
   */
  success(title, message, config = {}) {
    this.form.addResult('notify', {
      type: 'success',
      title,
      message,
      ...config,
    });
    return this;
  }

  /**
   * @param {string} title 
   * @param {string} message 
   * @param {Object} config 
   * @returns {this} 
   */
  warning(title, message, config = {}) {
    this.form.addResult('notify', {
      type: 'warning',
      title,
      message,
      ...config,
    });
    return this;
  }

  /**
   * @param {string} title 
   * @param {string} message 
   * @param {Object} config 
   * @returns {this} 
   */
  error(title, message, config = {}) {
    this.form.addResult('notify', {
      type: 'error',
      title,
      message,
      ...config,
    });
    return this;
  }

  /**
   * @param {string} message 
   * @param {Object} config 
   * @returns {this} 
   */
  messageInfo(message, config = {}) {
    this.form.addResult('message', {
      type: 'info',
      message,
      ...config,
    });
    return this;
  }

  /**
   * @param {string} message 
   * @param {Object} config 
   * @returns {this} 
   */
  messageSuccess(message, config = {}) {
    this.form.addResult('message', {
      type: 'success',
      message,
      ...config,
    });
    return this;
  }

  /**
   * @param {string} message 
   * @param {Object} config 
   * @returns {this} 
   */
  messageWarning(message, config = {}) {
    this.form.addResult('message', {
      type: 'warning',
      message,
      ...config,
    });
    return this;
  }

  /**
   * @param {string} message 
   * @param {Object} config 
   * @returns {this} 
   */
  messageError(message, config = {}) {
    this.form.addResult('message', {
      type: 'error',
      message,
      ...config,
    });
    return this;
  }

  /**
   * @param {string} event 
   * @param  {...any} params 
   * @returns {this}
   */
  event(event, ...params) {
    this.form.addResult('event', {
      event: [event, ...params],
    });
    return this;
  }

}