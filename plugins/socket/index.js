import Client from 'socket.io-client';

export default class Socket {

  static instance(url = 'https://192.168.0.50:3001') {
    if (this._instance_socket === undefined) {
      this._instance_socket = new Client(url);
      console.log('new instance');
    }
    return this._instance_socket;
  }

  constructor(point) {
    this.point = point;
    this.actions = {};

    this.events = {};
    this.socket = Socket.instance();
    this.socket.on('data', ({ data }) => {
      if (data.point === this.point && this.actions[data.action]) {
        for (const listener of this.actions[data.action]) {
          listener(data);
        }
      }
    });
    this.socket.on('event', (data) => {
      if (this.events[data.event]) {
        for (const listener of this.events[data.event]) {
          listener(data);
        }
      }
    });
  }

  emit(point, action, data) {
    this.socket.emit('data', { data: {point, action, data} });
    return this;
  }

  on(action, listener) {
    if (!Array.isArray(this.actions[action])) this.actions[action] = [];
    this.actions[action].push(listener);
    return this;
  }

  event(event, listener) {
    if (!Array.isArray(this.events[event])) this.events[event] = [];
    this.events[event].push(listener);
    return this;
  }

}