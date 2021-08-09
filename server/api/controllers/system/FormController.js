import ControllerBase from 'pencl-router/src/Controller/ControllerBase';
import Form from '../../form/Form';

export default class FormController extends ControllerBase {

  /**
   * @param {import('pencl-router/src/Builder/RouteBuilder')} builder
   */
  initRoutes(builder) {
    builder.namespace('form');
    builder.create('build', 'build/:id', this.buildForm).checkGET();
    builder.create('submit', 'submit/:id', this.submitForm).checkPOST();
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async buildForm(serve) {
    const form = Form.getForm(serve.BAG.id);

    form.setInfo(serve.GET.params.info && JSON.parse(serve.GET.params.info) || {});

    return serve.json({
      id: form.definition.id,
      form: await form.doBuild(),
      actions: form.actions,
      config: form.config,
    });
  }

  /**
   * @param {import('pencl-router/src/Request/Serve')} serve 
   */
  async submitForm(serve) {
    const form = Form.getForm(serve.BAG.id);

    form.setInfo((await serve.FORM.getValue('info')) || {});
    await form.doSubmit(await serve.FORM.getValue('values'), await serve.FORM.getValue('action'));

    return serve.json({
      id: form.definition.id, 
      results: form.getResults(),
      config: form.config,
    });
  }

}