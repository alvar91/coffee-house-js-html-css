import { Observer } from "../utils/observer.js";

import { FORM_MODE, TIME_ANIMATION_DELAY_IN_MS } from "../const.js";

export class ProductsModel extends Observer {
  constructor() {
    super();

    this._products = null;

    this._currentProductsCategory = 0;
    this._currentProduct = null;
    this._calculateForm = null;
    this._currentPrice = 0;

    this._currentModalMode = null;
  }

  setIsProductsLoading(updateType, update) {
    this._notify(updateType, update);
  }

  getProducts() {
    return this._products;
  }

  setProducts(updateType, products) {
    this._products = products;

    this._notify(updateType, { isLoading: false });
  }

  setCurrentProductsCategory(updateType, productsCategory) {
    this._currentProductsCategory = productsCategory;

    setTimeout(() => {
      this._notify(updateType, { isLoading: false });
    }, TIME_ANIMATION_DELAY_IN_MS);
  }

  getCurrentProductsCategory() {
    return this._currentProductsCategory;
  }

  setCurrentModalMode(updateType, currentModalMode) {
    this._currentModalMode = currentModalMode;
    this._notify(updateType, { isLoading: false });
  }

  getCurrentModalMode() {
    return this._currentModalMode;
  }

  resetCurrentModalMode(updateType) {
    this._currentModalMode = null;
    this._notify(updateType);
  }

  setCurrentProduct(productId) {
    const products = this.getProducts();

    const currentProduct = Object.values(products)
      .flat()
      .find(({ id }) => id == productId);

    if (currentProduct) {
      this._currentProduct = currentProduct;
      this._currentPrice = Number(currentProduct.price ?? 0);

      this._setCalculateForm(this._currentProduct);
    }
  }

  getCurrentProduct() {
    return this._currentProduct;
  }

  resetCurrentProduct() {
    this._currentProduct = null;
    this._calculateForm = null;
  }

  _addCheckedField(fields, type) {
    return Object.entries(fields).reduce((acc, [key, field], index) => {
      acc[key] = Object.assign(field, {
        checked: type === FORM_MODE.radio && index === 0,
        type,
      });

      return acc;
    }, {});
  }

  _setCalculateForm({ additives, size }) {
    this._calculateForm = {
      size: this._addCheckedField(size, FORM_MODE.radio),
      additives: this._addCheckedField(additives, FORM_MODE.checkbox),
    };
  }

  getCalculateForm() {
    return this._calculateForm;
  }

  updateRadioCalculateForm(updateType, { target, key }) {
    const calculateForm = this.getCalculateForm();

    const isChecked = calculateForm[target][key]["checked"];

    // TODO: make pure
    if (isChecked !== undefined) {
      Object.entries(calculateForm[target]).forEach(([key]) => {
        calculateForm[target][key] = Object.assign(calculateForm[target][key], {
          checked: false,
        });
      });

      calculateForm[target][key]["checked"] = true;

      this._calculateForm = calculateForm;

      this._updateCurrentPrice();

      this._notify(updateType, { isLoading: false });
    }
  }

  updateCheckboxCalculateForm(updateType, { target, key }) {
    const calculateForm = this.getCalculateForm();

    const isChecked = calculateForm[target][key]["checked"];

    if (isChecked !== undefined) {
      calculateForm[target][key]["checked"] = !isChecked;

      this._calculateForm = calculateForm;

      this._updateCurrentPrice();

      this._notify(updateType, { isLoading: false });
    }
  }

  resetCalculateForm() {
    this._calculateForm = null;
  }

  _updateCurrentPrice() {
    const calculateForm = this.getCalculateForm();
    const priceOfCurrentProduct = Number(this._currentProduct.price);

    const flatFields = Object.values(calculateForm)
      .map((item) => Object.values(item))
      .flat();

    this._currentPrice =
      priceOfCurrentProduct +
      flatFields.reduce((acc, { checked, addPrice }) => {
        return checked ? acc + +addPrice : acc;
      }, 0);
  }

  getCurrentPrice() {
    return this._currentPrice;
  }
}
