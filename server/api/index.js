import Core from 'pencl-core';

Core().booting(__dirname);

import Serve from 'pencl-router/src/Request/Serve';
import Router from 'pencl-router';

import SchemaController from './controllers/knex/SchemaController';
import RouterController from './controllers/router/RouterController';
import ContentController from './controllers/knex/ContentController';

const manager = Router().manager;

const schemaController =  new SchemaController();
manager.addController(schemaController);
schemaController.onLoad(manager);

manager.addController(new RouterController());
manager.addController(new ContentController());

console.log(Router().config);

/**
 * @param {import('http').ClientRequest} req
 * @param {import('http').ServerResponse} res 
 * @param {*} next 
 */
export default async function (request, response, next) {
  manager.serve(new Serve(request, response));
}