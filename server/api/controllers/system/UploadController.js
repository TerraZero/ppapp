import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import Core from 'pencl-core';
import FS from 'fs';
import Knex from 'pencl-knex';
import Dayjs from 'dayjs';
import FileUtil from 'pencl-kit/src/Util/FileUtil';

export default class SchemaController extends ControllerBase {

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('upload');
    builder.create('file', 'file', this.fileUpload).checkPOST();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async fileUpload(serve) {
    const field = await serve.FORM.fields();
    const file = (await serve.FORM.files()).file;
    const path = '/' + (field.upload_dir || 'uploads') + '/' + Dayjs().format('YYYY-MM') + '/' + file.name;
    const storage = Knex().storage;

    const ids = await storage.find('file', {
      name: file.name,
      size: file.size,
    });

    if (ids.length) {
      const entity = await storage.load('file', ids[0]);

      return serve.json({state: true, value: entity.data});
    }

    if (file.size / 1024 / 1024 > 10) {
      return serve.json({state: false, message: 'The file is to big for upload.'});
    }

    await (new Promise(function(resolve) {
      const target = Core().boot.getPath('~/static' + path);
      FileUtil.prepareDir(Core().boot.root, target);
      const write = FS.createWriteStream(target);
      const read = FS.createReadStream(file.path);

      write.on('finish', () => {
        resolve();
      });
      read.on('end', () => {
        resolve();
      });

      read.pipe(write);
    }));

    const value = {
      label: file.name,
      name: file.name,
      path: path,
      size: file.size,
      status: 1,
    };

    const entity = storage.create('file', 'file');

    entity.setData(value);
    await storage.save(entity);

    return serve.json({state: true, value: entity.data});
  }

}