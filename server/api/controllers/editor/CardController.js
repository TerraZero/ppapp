import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import FS from 'fs';
import Path from 'path';
import { v4 } from 'uuid';
import FileUtil from 'pencl-kit/src/Util/FileUtil';

export default class CardController extends ControllerBase {

  constructor() {
    super();
    this.cards = null;
  }

  getDataPath() {
    return Path.join(process.cwd(), '/static/data/editor/cards.data.json');
  }

  /**
   * @param {Object<string, string>} filters
   * @returns {array}
   */
  getData(filters = null) {
    if (this.cards === null) {
      const path = this.getDataPath();
      if (FS.existsSync(path)) {
        this.cards = require(path);
      } else {
        this.cards = [];
      }
    }

    if (filters === null) return this.cards;
    return this.cards.filter((v) => {
      for (const field in filters) {
        if (!(v[field] + '').toLowerCase().includes((filters[field] + '').toLowerCase())) return false;
      }
      return true;
    });
  }

  setData(item) {
    const data = this.getData();
    
    if (item.id === undefined) {
      item.id = v4();
      data.push(item);
    } else {
      const index = data.findIndex(v => v.id === item.id);
      if (index === -1) {
        data.push(item);
      } else {
        data[index] = item;
      }
    }

    this.saveData(data);
    return this;
  }

  saveData(data) {
    this.data = data;
    const path = this.getDataPath();
    if (!FS.existsSync(path)) {
      FileUtil.prepareDir(Path.join(process.cwd(), '/static'), path);
    }
    FS.writeFileSync(path, JSON.stringify(data));
    return this;
  }

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('cardeditor');
    builder.create('list', 'list/:page', this.list).checkGET();
    builder.create('save', 'save', this.save).checkPOST();
    builder.create('remove', 'remove/:id', this.remove).checkGET();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async list(serve) {
    const page = serve.BAG.page - 1;
    const number = serve.GET.params.number || 50;
    const offset = page * number;
    const data = this.getData();
    const items = [];
    
    for (let i = 0; i < number && i + offset < data.length; i++) {
      items.push(data[i + offset]);
    }
    return serve.json({ items, meta: { page, number, offset, total: data.length } });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async save(serve) {
    const card = {};

    for (const field of await serve.FORM.getFields()) {
      card[field] = await serve.FORM.getRaw(field);
    }
    this.setData(card);
    return serve.json({ card });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async remove(serve) {
    const id = serve.BAG.id;
    const data = this.getData();
    const index = data.findIndex(v => v.id === id);
    data.splice(index, 1);
    this.saveData(data);
    return serve.json({ index, id });
  }

}