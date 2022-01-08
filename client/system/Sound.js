import { Howl, Howler } from 'howler';
import Easing from 'easing';

/**
 * @typedef T_SoundConfig
 * @property {Object} howler
 * @property {string[]} howler.src
 * @property {boolean} [howler.autoplay]
 * @property {boolean} [howler.loop]
 * @property {volume} [howler.number]
 */

/**
 * @callback C_EaseCallback
 * @param {Sound} sound
 * @param {number} value
 * @param {number} step
 * @param {number} steps
 */

export default class Sound {

  /**
   * @param {import('./SoundSystem').default} system 
   * @param {T_SoundConfig} config 
   */
  constructor(system, config) {
    this.system = system;
    this.config = config;

    this._howl = new Howl(config.howler);
    this._ids = {};
  }

  /** @returns {Howl} */
  get howl() {
    return this._howl;
  }

  /**
   * 
   * @param {C_EaseCallback} callback
   * @param {number} time 
   * @param {number} steps 
   * @param {string} easing 
   * @param {object} config 
   * @returns {this}
   */
  ease(callback, time = 1000, steps = 100, easing = 'sinusoidal', config = {}) {
    config.duration = time;
    let step = 0;
    Easing.event(steps, easing, config).on('data', (value) => {
      callback(this, value, step++, steps);
    });
    return this;
  }

  /**
   * @param {string} sprite 
   * @returns {this}
   */
  play(sprite = 'default') {
    if (!this.howl.playing(this._ids[sprite])) {
      this._ids[sprite] = this.howl.play(this._ids[sprite]);
    }
    return this;
  }

  /**
   * @param {string} sprite 
   * @returns {this}
   */
  stop(sprite = 'default') {
    if (this.howl.playing(this._ids[sprite])) {
      this.howl.stop(this._ids[sprite]);
    }
    return this;
  }

}