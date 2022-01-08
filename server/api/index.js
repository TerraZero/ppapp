import Core from 'pencl-core';

Core().booting(__dirname);

import Serve from 'pencl-router/src/Request/Serve';
import Router from 'pencl-router';

import Form from './form/Form';
import CreateBundleForm from './form/CreateBundleForm';

import SchemaController from './controllers/knex/SchemaController';
import RouterController from './controllers/router/RouterController';
import ContentController from './controllers/knex/ContentController';
import DisplayController from './controllers/knex/DisplayController';
import UploadController from './controllers/system/UploadController';
import MenuController from './controllers/router/MenuController';
import FormController from './controllers/system/FormController';
import MapController from './controllers/editor/MapController';
import CardController from './controllers/editor/CardController';
import MediaController from './controllers/editor/MediaController';

Form.addForm(CreateBundleForm);

const manager = Router().manager;

const schemaController =  new SchemaController();
manager.addController(schemaController);
schemaController.onLoad(manager);

manager.addController(new RouterController());
manager.addController(new ContentController());
manager.addController(new DisplayController());
manager.addController(new UploadController());
manager.addController(new MenuController());
manager.addController(new FormController());
manager.addController(new MapController());
manager.addController(new CardController());
manager.addController(new MediaController());

console.log(Router().config);

/**
 * @param {import('http').ClientRequest} req
 * @param {import('http').ServerResponse} res 
 * @param {*} next 
 */
export default async function (request, response, next) {
  manager.serve(new Serve(request, response));
}