export default class Provider {
  constructor(store) {
    this._store = store;
  }

  getProducts() {
    if (this._getIsItemPersisted({ key: "products" })) {
      return Promise.resolve(this._store.getItem({ key: "products" }));
    }

    return Promise.reject(new Error(`Ошибка загрузки товаров`));
  }

  _getIsItemPersisted({ key, subKey }) {
    if (key && subKey) {
      return !!this._store.getItem({ key, subKey });
    }

    if (key) {
      return !!this._store.getItem({ key });
    }

    return false;
  }

  setItem(params) {
    this._store.setItem(params);
  }

  resetStorage() {
    this._store.resetStorage();
  }

}
