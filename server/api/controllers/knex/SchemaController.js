import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import Knex from 'pencl-knex';

export default class SchemaController extends ControllerBase {

  /**
   * @param {import('pencl-router/src/Manager/RouterManager')} manager 
   */
  onLoad(manager) {
    manager.addMiddleware('meta.route', this.addMetaRoute, true);
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  addMetaRoute(serve) {
    const routes = {};
    for (const route of this.routes) {
      routes[route.namespace] = routes[route.namespace] || {};
      routes[route.namespace][route.name] = route.real;
    }

    serve.meta('routes', routes);
    return serve;
  }

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('schema');
    builder.create('create.entity', 'create/entity', this.createEntity).checkPOST();
    builder.create('create.entity.form', 'create/entity/:entity/form', this.createEntityForm).checkGET();
    builder.create('create.entity.form.submit', 'create/entity/:entity/form', this.createEntityFormSubmit).checkPOST();
    builder.create('create.entity.field', 'create/entity/field', this.createEntityField).checkPOST();
    builder.create('create.field', 'create/field', this.createField).checkPOST();
    builder.create('view.field', 'view/fields(/:field)', this.viewField).checkGET();
    builder.create('view', 'view(/:entity(/:bundle(/:field)))', this.viewSchema).checkGET();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async createEntity(serve) {
    const schema = {
      entity: await serve.FORM.getField('entity'),
      bundle: await serve.FORM.getField('bundle'),
      label: await serve.FORM.getField('label'),
      config: await serve.FORM.getField('config'),
      fields: {},
    };

    const entity = Knex().schemas.createEntity(schema.entity, schema.bundle, schema.label, schema.config, schema.fields);

    Knex().schemas.dbCreateEntity(Knex().connection(), entity);

    return serve.json(entity.entityschema.data);
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async createEntityForm(serve) {
    const entity = serve.BAG.entity;
    const type = Knex().schemas.getEntityType(entity);

    const form = {};

    type.formSchemaBundle(form);

    return serve.json({ form });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async createEntityFormSubmit(serve) {
    const entity = serve.BAG.entity;
    const type = Knex().schemas.getEntityType(entity);

    const form = {};

    type.formSchemaBundle(form);
    const value = await serve.FORM.getValue('value');

    return serve.json({ form, value });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async createEntityField(serve) {
    const schema = {
      entity: await serve.FORM.getField('entity'),
      bundle: await serve.FORM.getField('bundle'),
      field: await serve.FORM.getField('field'),
      config: await serve.FORM.getField('config'),
    };

    const entityschema = Knex().schemas.getSchema('entity', schema.entity + '.' + schema.bundle);

    Knex().schemas.createEntityField(entityschema, schema.field, schema.config);

    return serve.json(entityschema.data);
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async createField(serve) {
    const schema = {
      field: await serve.FORM.getField('field'),
      label: await serve.FORM.getField('label'),
      type: await serve.FORM.getField('type'),
      config: await serve.FORM.getField('config'),
    };

    const fieldschema = Knex().schemas.createField(schema.field, schema.label, schema.type, schema.config);

    Knex().schemas.dbCreateField(Knex().connection(), fieldschema);

    return serve.json(fieldschema.data);
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async viewSchema(serve) {
    /** @type {import('pencl-knex/src/SchemaManager')} */
    const Schemas = Knex().schemas;
    const schema = {};

    if (serve.BAG.entity && serve.BAG.bundle && serve.BAG.field) {
      const field = Schemas.getField(serve.BAG.entity, serve.BAG.bundle, serve.BAG.field);

      schema.label = field.label;
      schema.storage = field.fieldschema.data;
      schema.instance = field.config;
      schema.props = {};
      for (const prop in field.props) {
        schema.props[prop] = {};
        schema.props[prop].type = field.props[prop].type;
        schema.props[prop].name = field.props[prop].name;
        schema.props[prop].config = field.props[prop].config;
      }
    } else if (serve.BAG.entity && serve.BAG.bundle) {
      const entity = Schemas.getEntity(serve.BAG.entity, serve.BAG.bundle);

      schema.label = entity.bundlelabel;
      schema.storage = entity.entityschema.data;
      schema.props = {};
      for (const prop in entity.props) {
        schema.props[prop] = {};
        schema.props[prop].type = entity.props[prop].type;
        schema.props[prop].name = entity.props[prop].name;
        schema.props[prop].config = entity.props[prop].config;
      }
    } else if (serve.BAG.entity) {
      schema.entity = serve.BAG.entity;
      schema.label = Schemas.getEntityType(serve.BAG.entity).label;
      schema.bundles = {};
      for (const entity of Schemas.getEntities()) {
        if (entity.get('entity') === serve.BAG.entity) {
          schema.bundles[entity.get('bundle')] = entity.get('label');
        }
      }
    } else {
      schema.entities = {};
      for (const entity of Schemas.getEntities()) {
        schema.entities[entity.get('entity')] = Schemas.getEntityType(entity.get('entity')).label;
      }
    }
    return serve.json(schema);
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async viewField(serve) {
    /** @type {import('pencl-knex/src/SchemaManager')} */
    const Schemas = Knex().schemas;
    const schema = {};

    if (serve.BAG.field) {
      const field = Schemas.getSchema('field', serve.BAG.field);

      schema.label = field.get('label');
      schema.storage = field.data;
    } else {
      schema.fields = {};
      for (const field of Schemas.getFields()) {
        schema.fields[field.get('field')] = field.data;
      }
    }
    return serve.json(schema);
  }

}