import { MODE, UpdateType } from "../const.js";

import Store from "../api/store.js";
import Provider from "../api/provider.js";

import { ProductsModel } from "../models/products-model.js";

import Utils from "../utils/common.js";

import { STORE_NAME } from "../const.js";

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(store);

export class MenuPresenter {
  constructor(view) {
    this._view = view;

    this._api = apiWithProvider;

    this._productsModel = new ProductsModel();
    this._productsModel.addObserver(this._handleModelEvent);
  }

  // Handlers
  _handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this._view.updatePatch(data);
        break;

      case UpdateType.MINOR:
        this._view.updateMinor(data);
        break;

      case UpdateType.MAJOR:
        this._view.updateMajor(data);
        break;
    }
  };

  handleModalClick = (productId) => {
    this._productsModel.setCurrentProduct(productId);

    this._productsModel.setCurrentModalMode(UpdateType.MINOR, MODE.buy);
  };

  handleCloseModal = () => {
    this._productsModel.resetCurrentProduct();
    this._productsModel.resetCurrentModalMode(UpdateType.MINOR);
  };

  escKeyDownHandler = (evt) => {
    Utils.addEscapeEvent(evt, this.handleCloseModal);
  };

  // Api
  _fetchProducts() {
    this._productsModel.setIsProductsLoading(UpdateType.MAJOR, {
      isLoading: true,
    });

    this._api
      .getProducts()
      .then((response) => {
        this._productsModel.setProducts(UpdateType.MAJOR, response);
      })
      .catch((e) => {
        console.error(e.message);
        Utils.toast(e.message);
        this._productsModel.setProducts(UpdateType.MAJOR, null);
      });
  }

  getCurrentModalMode() {
    return this._productsModel.getCurrentModalMode();
  }

  resetCurrentModalMode() {
    return this._accountsModel.resetCurrentModalMode();
  }

  getProducts() {
    return this._productsModel.getProducts();
  }

  setCurrentProductsCategoryChange = (category) => {
    this._productsModel.setCurrentProductsCategory(UpdateType.MAJOR, category);
  };

  getCurrentProductsCategory() {
    return this._productsModel.getCurrentProductsCategory();
  }

  getCurrentProduct() {
    return this._productsModel.getCurrentProduct();
  }

  getCalculateForm() {
    return this._productsModel.getCalculateForm();
  }

  radioChangeHandler = (updateData) => {
    this._productsModel.updateRadioCalculateForm(UpdateType.PATCH, updateData);
  };

  checkboxChangeHandler = (updateData) => {
    this._productsModel.updateCheckboxCalculateForm(
      UpdateType.PATCH,
      updateData
    );
  };

  getCurrentPrice() {
    return this._productsModel.getCurrentPrice();
  }

  init() {
    this._fetchProducts();
  }
}
