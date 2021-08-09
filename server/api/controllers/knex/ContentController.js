import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import Knex from 'pencl-knex';

export default class ContentController extends ControllerBase {

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('content');
    builder.create('list', 'list/:entity', this.listContent).checkGET();
    builder.create('view', 'view/:entity/:id', this.viewContent).checkGET();
    builder.create('create', 'create/:entity/:bundle', this.createContent).checkPOST();
    builder.create('update', 'save/:entity/:id', this.updateContent).checkPOST();
    builder.create('delete', 'delete/:entity/:id', this.deleteContent).checkPOST();
    builder.create('new', 'new/:entity/:bundle', this.newContent).checkGET();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async listContent(serve) {
    const pager = serve.GET.getValue('pager', {limit: 10, page: 1});
    const filters = serve.GET.getValue('filters', {});

    const type = Knex().schemas.getEntityType(serve.BAG.entity);
    const select = Knex()
      .connection()
      .select()
      .from(type.table)
      .limit(pager.limit)
      .offset((pager.page - 1) * pager.limit);

    if (serve.GET.params.search) {
      select.where('label', 'like', '%' + serve.GET.params.search + '%');
    }

    for (const filter in filters) {
      if (filters[filter] !== '' && filters[filter] !== null) {
        select.where(filter, '=', filters[filter]);
      }
    }

    const count = Knex()
      .connection()(type.table)
      .count('id', {as: 'total'});

    if (serve.GET.params.search) {
      count.where('label', 'like', '%' + serve.GET.params.search + '%');
    }

    for (const filter in filters) {
      if (filters[filter] !== '' && filters[filter] !== null) {
        count.where(filter, '=', filters[filter]);
      }
    }

    pager.total = (await count)[0].total;
    return serve.json({ data: await select, label: type.label, pager });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async viewContent(serve) {
    const entity = await Knex().storage.load(serve.BAG.entity, serve.BAG.id, ...((await serve.GET.getField('fields')) || ['[all]']));

    return serve.json({ entity: entity.data, schema: entity.schemadata });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async newContent(serve) {
    const entity = await Knex().storage.create(serve.BAG.entity, serve.BAG.bundle);

    return serve.json({ entity: entity.data });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async createContent(serve) {
    const entity = Knex().storage.create(serve.BAG.entity, serve.BAG.bundle);

    entity.setData(await serve.FORM.getValue('data'));
    await Knex().storage.save(entity);

    return serve.json({ entity: entity.data });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async updateContent(serve) {
    const entity = await Knex().storage.load(serve.BAG.entity, serve.BAG.id, ...((await serve.FORM.getField('fields')) || ['[all]']));

    entity.setData(await serve.FORM.getValue('data'));
    await Knex().storage.save(entity);

    return serve.json({ entity: entity.data });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async deleteContent(serve) {
    const entity = await Knex().storage.load(serve.BAG.entity, serve.BAG.id, '[all]');

    await Knex().storage.delete(entity);

    return serve.json({ entity: entity.data });
  }

}