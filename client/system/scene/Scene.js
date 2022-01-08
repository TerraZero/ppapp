import TestScene from './TestScene';

export default class Scene {

  static getScenes() {
    if (this._scene_instance === undefined) {
      this._scene_instance = {
        test: new TestScene(),
      };
    }
    return this._scene_instance;
  }

  get actions() {
    return {};
  }

}