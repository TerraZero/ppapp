import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import FS from 'fs';
import Path from 'path';

export default class MapController extends ControllerBase {

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('editor');
    builder.create('list', 'list', this.list).checkGET();
    builder.create('load', 'load/:id', this.load).checkGET();
    builder.create('save', 'save/:id', this.save).checkPOST();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async list(serve) {
    const list = {};
    const dir = Path.join(process.cwd(), '/static/data/maps/');

    const files = FS.readdirSync(dir);
    for (const file of files) {
      const content = FS.readFileSync(Path.join(dir, file)).toString();

      list[file] = JSON.parse(content).title;
    }
    return serve.json({ list });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async load(serve) {
    const file = serve.BAG.id;
    const dir = Path.join(process.cwd(), '/static/data/maps/');

    const content = FS.readFileSync(Path.join(dir, file)).toString();

    return serve.json(JSON.parse(content));
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async save(serve) {
    const fields = await serve.FORM.fields();
    const file = Path.join(process.cwd(), '/static/data/maps/', fields.key + '.json');

    FS.writeFileSync(file, JSON.stringify(fields, null, '  '));
    return serve.json({status: 'ok'});
  }

}