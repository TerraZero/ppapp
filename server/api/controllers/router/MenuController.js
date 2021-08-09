import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import Knex from 'pencl-knex';

export default class MenuController extends ControllerBase {

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('menu');
    builder.create('generate', 'generate', this.viewGenerate).checkGET();
    builder.create('live', 'live', this.viewLive).checkGET();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  viewGenerate(serve) {
    const schemas = Knex().schemas;
    const generate = {};

    generate['entity'] = [];
    for (const key in schemas._entitytypes) {
      generate['entity'].push({
        entity: {
          key: key,
          label: schemas._entitytypes[key].label,
        },
        encoded: {
          entity: key,
        },
      });
    }

    generate['entity.bundle'] = [];
    for (const schema of schemas.getEntities()) {
      generate['entity.bundle'].push({
        entity: {
          key: schema.get('entity'),
          label: schemas._entitytypes[schema.get('entity')].label,
        },
        bundle: {
          key: schema.get('bundle'),
          label: schema.get('label'),
        },
        encoded: {
          entity: schema.get('entity'),
          bundle: schema.get('bundle'),
        },
      });
    }

    return serve.json(generate);
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async viewLive(serve) {
    const storage = Knex().storage;

    switch (serve.GET.params.live) {
      case 'id':
        const entitytype = serve.GET.params.entity;
        const id = serve.GET.params.id;
        const entity = await storage.load(entitytype, id);

        const live = {};

        live.id = {
          key: id,
          label: entity.get('label'),
        };

        live.entity = {
          key: entity.schema.entity,
          label: entity.schema.label,
        };

        live.bundle = {
          key: entity.schema.bundle,
          label: entity.schema.bundlelabel,
        };

        live.encoded = {
          id: live.id.key,
          entity: live.entity.key,
          bundle: live.bundle.key,
        };

        serve.json(live);
        break;
    }
    return serve;
  }

}