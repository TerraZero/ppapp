import Scene from './Scene';

export default class TestScene extends Scene {

  get scene() {
    return [
      {sound: 'heli', config: {}},
      {sound: 'rain', config: {}},
    ];
  }

  get actions() {
    return {
      left: 'Left',
    };
  }

  execute(action) {
    
  }

}