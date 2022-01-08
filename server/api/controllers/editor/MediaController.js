import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import FS from 'fs';
import Path from 'path';
import { v4 } from 'uuid';
import FileUtil from 'pencl-kit/src/Util/FileUtil';
import Fetch from 'node-fetch';

export default class MediaController extends ControllerBase {

  constructor() {
    super();
    this.data = null;
  }

  getDataPath() {
    return Path.join(process.cwd(), '/static/data/editor/media.data.json');
  }

  /**
   * @param {Object<string, string>} filters
   * @returns {array}
   */
  getData(filters = null) {
    if (this.data === null) {
      const path = this.getDataPath();
      if (FS.existsSync(path)) {
        this.data = require(path);
      } else {
        this.data = [];
      }
    }

    if (filters === null) return this.data;
    return this.data.filter((v) => {
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

  getSourcePath() {
    return '/editor/media';
  }

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('mediaeditor');
    builder.create('meta', 'meta', this.meta).checkGET();
    builder.create('list', 'list/:page', this.list).checkGET();
    builder.create('create', 'create', this.create).checkPOST();
    builder.create('update', 'update', this.update).checkPOST();
    builder.create('load', 'load/:id', this.load).checkGET();
    builder.create('remove', 'remove/:id', this.remove).checkGET();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async meta(serve) {
    const data = this.getData();
    const types = [];

    for (const item of data) {
      if (!types.includes(item.type)) types.push(item.type);
    }
    return serve.json({ types, total: data.length });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async list(serve) {
    const page = serve.BAG.page - 1;
    const number = serve.GET.params.number || 10;
    const offset = page * number;
    const filters = this.getFilters(serve) || null;
    const data = this.getData(filters);
    const items = [];
    
    for (let i = 0; i < number && i + offset < data.length; i++) {
      items.push(data[i + offset]);
    }
    return serve.json({ items, meta: { page, number, offset, filters, total: data.length } });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  getFilters(serve) {
    const filters = {};

    if (serve.GET.params.filters) {
      const data = JSON.parse(serve.GET.params.filters);
      for (const index in data) {
        if (data[index]) filters[index] = data[index];
      }
    }
    return filters;
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
   async create(serve) {
    const fields = ['name', 'url', 'type', 'search'];
    const media = {};

    for (const field of fields) {
      media[field] = await serve.FORM.getRaw(field);
    }

    media.file = media.name.toLowerCase().replace(new RegExp('([^a-z]+)', 'gm'), '_') + Path.extname(media.url);
    media.path = Path.join(this.getSourcePath(), media.file).replace(new RegExp('[\\\\]', 'gm'), '/');
    
    FileUtil.prepareDir(Path.join(process.cwd(), '/static/'), media.path);
    await this.download(media.url, Path.join(process.cwd(), 'static', media.path));
    this.setData(media);

    return serve.json({ media });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async update(serve) {
    const id = await serve.FORM.getRaw('id');
    const media = this.getData({ id }).shift();
    
    for (const field of ['name', 'type', 'search']) {
      media[field] = await serve.FORM.getRaw(field);
    }
    this.setData(media);
    return serve.json({ media });
  }

  async download(url, dest) {
    const res = await Fetch(url);
    return new Promise((resolve, reject) => {
      const stream = FS.createWriteStream(dest);
      res.body.on('error', reject);
      stream.on('finish', resolve);
      res.body.pipe(stream);
    });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async load(serve) {
    const id = serve.BAG.id;
    const data = this.getData({ id });

    return serve.json({ media: data.shift() });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async remove(serve) {
    const id = serve.BAG.id;
    const data = this.getData();
    const index = data.findIndex(v => v.id === id);
    const media = data[index];
    data.splice(index, 1);

    const path = Path.join(process.cwd(), 'static', media.path);
    if (FS.existsSync(path)) {
      FS.unlinkSync(path);
    }
    this.saveData(data);

    return serve.json({ media });
  }

}