import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import Knex from 'pencl-knex';
import Displays from '../../../info/widgets.json';

export default class DisplayController extends ControllerBase {

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('display');
    builder.create('view', 'view/:entity/:bundle', this.viewDisplay).checkGET();
    builder.create('form', 'form/:entity/:bundle', this.formDisplay).checkGET();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async viewDisplay(serve) {
    const entity = Knex().schemas.getEntity(serve.BAG.entity, serve.BAG.bundle);
    const schema = Knex().schemas.getSchema('display', serve.BAG.entity + '.' + serve.BAG.bundle);

    const propwidgets = schema && schema.get('props') || {};
    for (const prop in entity.props) {
      if (propwidgets[prop] === undefined) {
        const widget = Displays.defaults[entity.props[prop].type] || 'WidgetTextField';

        propwidgets[prop] = Displays.widgets[widget];
        propwidgets[prop].widget = widget;
      }
    }

    const fieldwidgets = schema && schema.get('fields') || {};
    for (const field of entity.getFields()) {
      if (fieldwidgets[field] === undefined) {
        const info = entity.getField(field);
        const widget = Displays.defaults[info.type] || 'WidgetTextField';

        fieldwidgets[field] = Displays.widgets[widget];
        fieldwidgets[field].widget = widget;
      }
    }

    return serve.json({ fields: fieldwidgets, props: propwidgets });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async formDisplay(serve) {
    const entity = Knex().schemas.getEntity(serve.BAG.entity, serve.BAG.bundle);
    const schema = Knex().schemas.getSchema('display', serve.BAG.entity + '.' + serve.BAG.bundle);

    const propwidgets = schema && schema.get('props') || {};
    for (const prop in entity.props) {
      if (propwidgets[prop] === undefined) {
        const widget = Displays.defaults[entity.props[prop].type] || 'WidgetTextField';

        propwidgets[prop] = Displays.widgets[widget];
        propwidgets[prop].widget = widget;
      }
    }

    const fieldwidgets = schema && schema.get('fields') || {};
    for (const field of entity.getFields()) {
      if (fieldwidgets[field] === undefined) {
        const info = entity.getField(field);
        const widget = Displays.defaults[info.type] || 'WidgetTextField';

        fieldwidgets[field] = Displays.widgets[widget];
        fieldwidgets[field].widget = widget;
      }
    }

    return serve.json({ fields: fieldwidgets, props: propwidgets });
  }

}