import Form from './Form';
import Knex from 'pencl-knex';

export default class CreateBundleForm extends Form {

  /** @returns {string} */
  static get id() {
    return 'create.bundle.form';
  }

  /**
   * @param {import('pencl-knex/types').T_Form} form
   * @returns {import('pencl-knex/types').T_Form}
   */
  async build(form) {
    const schemas = Knex().schemas;
    const entity = this.info.entity;
    const bundle = this.info.bundle || null;
    const config = this.info.config;
    const type = schemas.getEntityType(entity);

    type.formSchemaBundle(form, config);
    if (bundle !== null) {
      const entitytype = schemas.getEntity(entity, bundle);

      entitytype.definition.formInstanceFields(entitytype, form, config);
    }

    this.addAction('submit', 'Create Bundle', {
      type: 'primary',
      icon: 'check',
    });
    this.addAction('cancel', 'Cancel', {
      icon: 'close',
    });
    return form;
  }

  /**
   * @param {import('pencl-knex/types').T_Form} form
   * @param {import('./FormState').default} state
   */
  async validate(form, state) {
    if (state.action.key === 'submit') {
      const schemas = Knex().schemas;
      const bundle = this.getField('bundle');
      const label = this.getField('label');
      const bundlekey = state.getValue(bundle);

      if (bundlekey === '') {
        state.error(bundle, 'Field "{label}" is required.');
      } 
      if (state.getValue(label) === '') {
        state.error(label, 'Field "{label}" is required.');
      }

      const schema = schemas.getSchema('entity', this.info.entity + '.' + bundlekey);
      if (schema) {
        state.error(bundle, 'The bundle key is "' + bundlekey + '" already exist.');
      }
    }
  }

  /**
   * @param {import('pencl-knex/types').T_Form} form
   * @param {import('./FormState').default} state
   */
  async submit(form, state) {
    if (state.action.key === 'cancel') {
      this.results.info('Cancel', 'The bundle was not created.');
      return;
    }

    const schemas = Knex().schemas;
    const values = state.values;
    const bundle = this.info.bundle || null;

    if (bundle) {
      const schema = schemas.getSchema('entity', serve.BAG.entity + '.' + serve.BAG.bundle);
      
      for (const index in schema.schema) {
        schema.schema[index] = value[index] === undefined ? schema.schema[index] : value[index];
      }
      schemas.saveSchema(schema);
      return serve.json({ schema, value });
    } else {
      schemas.createEntity(this.info.entity, values.bundle, values.label, values.config || {}, values.fields || {});

      this.results.event('rebuild', {menu: true});
      this.results.success('Success', 'Created bundle "' + values.label + '" successfully.');
    }
  }

}