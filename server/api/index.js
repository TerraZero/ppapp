import Core from 'pencl-core';

Core().booting(__dirname);

import Serve from 'pencl-router/src/Request/Serve';
import Router from 'pencl-router';

import SchemaController from './controllers/knex/SchemaController';
import RouterController from './controllers/router/RouterController';
import ContentController from './controllers/knex/ContentController';
import DisplayController from './controllers/knex/DisplayController';
import UploadController from './controllers/system/UploadController';

const manager = Router().manager;

const schemaController =  new SchemaController();
manager.addController(schemaController);
schemaController.onLoad(manager);

manager.addController(new RouterController());
manager.addController(new ContentController());
manager.addController(new DisplayController());
manager.addController(new UploadController());

console.log(Router().config);

/**
 * @param {import('http').ClientRequest} req
 * @param {import('http').ServerResponse} res 
 * @param {*} next 
 */
export default async function (request, response, next) {
  manager.serve(new Serve(request, response));
}