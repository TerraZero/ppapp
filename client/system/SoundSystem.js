import { Howler } from 'howler';
import SoundData from '~/assets/data/sound.json';
import Sound from './Sound';

export default class SoundSystem {

  /**
   * @param {typeof import('./index').default} system 
   */
  constructor(system) {
    this.logger = system.logger('soundsystem');
    this._sounds = {};

    this.load();
  }

  load() {
    let count = 0;
    let loaded = 0;

    for (const name in SoundData) {
      count++;
      const config = JSON.parse(JSON.stringify(SoundData[name]));
      this._sounds[name] = new Sound(this, config);
      this.sound(name).howl.on('load', () => {
        loaded++;
        if (count === loaded) {
          this.logger.success({
            title: 'Ready',
            message: 'Loaded ' + count + ' sounds',
          });
        }
      });
    }
  }

  /**
   * @param {string} name 
   * @returns {Sound}
   */
  sound(name) {
    return this._sounds[name];
  }

  stop() {
    Howler.stop();
  }

}