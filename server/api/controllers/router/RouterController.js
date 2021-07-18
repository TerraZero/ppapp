import ControllerBase from 'pencl-router/src/Controller/ControllerBase';

export default class SchemaController extends ControllerBase {

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('router');
    builder.create('routes', 'routes', this.viewRoutes).checkGET();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  viewRoutes(serve) {
    const routes = {};
    for (const route of this.plugin.manager.routes) {
      let name = '';
      if (route.namespace) {
        name = route.namespace + '.' + route.name;
      } else {
        name = route.name;
      }
      routes[name] = {
        route: name,
        name: route.name,
        namespace: route.namespace,
        pattern: route.real,
        info: route.info,
      };
    }
    return serve.json({routes});
  }

}