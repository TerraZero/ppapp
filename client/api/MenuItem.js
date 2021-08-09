export default class MenuItem {

  /**
   * @param {import('./Menu').T_MenuItem} item
   */
  constructor(item, params) {
    this.item = item;
    this.params = params;
  }

  getString(string) {
    return Reflection.replaceCallback(string, (match) => {
      return Reflection.getDeep(this.params, match);
    });
  }

  getBoolean(bool) {
    if (typeof bool === 'boolean') return bool;
    if (bool === undefined) return false;
    return Reflection.replaceCallback(bool, (match) => {
      return Reflection.getDeep(this.params, match);
    }) === 'true';
  }

  title() {
    return this.getString(this.item.title);
  }

  menu() {
    return this.getString(this.item.menu || this.item.title);
  }

  breadcrump() {
    return this.getString(this.item.breadcrump || this.item.title);
  }

  showMenu() {
    return this.item.menu === undefined || typeof this.item.menu === 'string';
  }

  showBreadcrump() {
    return this.item.breadcrump === undefined || typeof this.item.breadcrump === 'string';
  }

  type() {
    return this.item.type;
  }

  isDanger() {
    return this.getBoolean(this.item.danger);
  }

  validate() {
    
  }

}