import { MenuPresenter } from "../presenters/menu-presenter.js";

import { Render } from "../utils/render.js";

import { HeaderContainer } from "./containers/header-container/index.js";
import { MainContainer } from "./containers/main-container/main-container.js";
import { FooterContainer } from "./containers/footer-container/index.js";

import { ModalContainer } from "./containers/modal-container/index.js";

import { ProductCalculateView } from "./components/product-calculate/index.js";
import { CalculateView } from "./components/calculate/index.js";


import { HeaderInnerView } from "./components/header-inner/index.js";

import { ProductsView } from "./components/products/index.js";

import { FooterInnerView } from "./components/footer-inner/index.js";

// import { LoadingView } from "./components/loading-view/index.js";

import {
  MODE,
} from "../const.js";

export class AppView {
  constructor() {
    this._menuPresenter = new MenuPresenter(this);

    this._rootContainer = document.getElementById("root");

    this._headerContainer = new HeaderContainer();
    this._mainContainer = new MainContainer();
    this._footerContainer = new FooterContainer();

    this.isLoading = false;
  }

  _renderHeaderComponent() {
    this._headerInnerComponent = new HeaderInnerView();
    Render.render(this._headerContainer, this._headerInnerComponent);

    this._headerInnerComponent.setHandlers();
  }
  _clearHeaderComponent() {
    if (this._headerInnerComponent) Render.remove(this._headerInnerComponent);
  }

  _renderMainComponent() {
    const products = this._menuPresenter.getProducts();

    const currentProductsCategory =
      this._menuPresenter.getCurrentProductsCategory();

    this._productsComponent = new ProductsView(
      products,
      currentProductsCategory
    );
    Render.render(this._mainContainer, this._productsComponent);
    this._productsComponent.setHandlers({
      handleModalHandler: this._menuPresenter.handleModalClick,
      currentCategoryChangeHandler:
        this._menuPresenter.setCurrentProductsCategoryChange,
    });
  }
  _clearMainComponent() {
    Render.remove(this._mainContainer);
  }

  _renderFooterComponent() {
    this._footerInnerComponent = new FooterInnerView();
    Render.render(this._footerContainer, this._footerInnerComponent);
  }
  _clearFooterComponent() {
    if (this._footerInnerComponent) Render.remove(this._footerInnerComponent);
  }

  // Inner Modal
  _renderInnerModal(currentModalMode) {
    switch (currentModalMode) {
      case MODE.buy:
        this._renderBuyModalInner();
        return;
      default:
        break;
    }
  }
  _clearInnerModal(currentModalMode) {

    switch (currentModalMode) {
      case MODE.buy:
        this._clearBuyModalInner();
      default:
        break;
    }
  }

  _renderCalculateInner() {
    const productCalculateContainer =
      this._productCalculateComponent.getCalculateModalContainer();

    const calculateForm = this._menuPresenter.getCalculateForm();
    const currentPrice = this._menuPresenter.getCurrentPrice();
    this._calculateComponent = new CalculateView(calculateForm, currentPrice);

    Render.render(productCalculateContainer, this._calculateComponent);

    this._calculateComponent.setHandlers(
      this._menuPresenter.radioChangeHandler,
      this._menuPresenter.checkboxChangeHandler
    );
  }
  _clearCalculateInner() {
    if (this._calculateComponent) Render.remove(this._calculateComponent);
  }

  _renderBuyModalInner() {
    const currentProduct = this._menuPresenter.getCurrentProduct();

    if (!currentProduct) return;

    const modalContainer = this._modalComponent.getModalContainer();

    this._productCalculateComponent = new ProductCalculateView(currentProduct);
    this._productCalculateComponent.setCloseModalClickHandler(
      this._menuPresenter.handleCloseModal
    );

    Render.render(
      modalContainer,
      this._productCalculateComponent
    );

    this._renderCalculateInner();
  }
  _clearBuyModalInner() {
    if (this._productCalculateComponent)
      Render.remove(this._productCalculateComponent);

    this._clearCalculateInner();
  }

  // Modal
  _renderModal() {
    const currentModalMode = this._menuPresenter.getCurrentModalMode();

    if (!currentModalMode) return;

    this._modalComponent = new ModalContainer();

    document.addEventListener(`keydown`, this._menuPresenter.escKeyDownHandler);

    this._modalComponent.setCloseModalClickHandler(
      this._menuPresenter.handleCloseModal
    );

    Render.render(document.body, this._modalComponent);
    this._renderInnerModal(currentModalMode);

    const paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
    document.body.style.paddingRight = paddingOffset;
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
  }
  _clearModal = () => {
    const currentModalMode = this._menuPresenter.getCurrentModalMode();

    if (this._modalComponent) {
      Render.remove(this._modalComponent);
    }

    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = 0;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);

    this._clearInnerModal(currentModalMode);
  };

  clearMajor() {
    if (this._loadingComponent) {
      Render.remove(this._loadingComponent);
    }

    // this.clearMinor();

    this._clearHeaderComponent();

    this._clearMainComponent();

    this._clearFooterComponent();
  }

  // _renderLoading() {
  //   this._loadingComponent = new LoadingView();

  //   Render.render(this._rootContainer, this._loadingComponent);
  // }

  renderMajor({ isLoading } = {}) {
    if (isLoading !== undefined) {
      this.isLoading = isLoading;
    }

    // if (this.isLoading) {
    //   this._renderLoading();
    //   return;
    // }

    Render.render(this._rootContainer, this._headerContainer);
    this._renderHeaderComponent();

    Render.render(this._rootContainer, this._mainContainer);
    this._renderMainComponent();

    Render.render(this._rootContainer, this._footerContainer);
    this._renderFooterComponent();
  }

  updateMajor(data) {
    this.clearMajor();
    this.renderMajor(data);
  }

  clearMinor() {
    this._clearModal();
  }

  renderMinor() {
    this._renderModal();
  }

  updateMinor(data) {
    this.clearMinor();
    this.renderMinor(data);
  }

  clearPatch() {
    this._clearCalculateInner();
  }

  renderPatch() {
    this._renderCalculateInner();
  }

  updatePatch() {
    this.clearPatch();
    this.renderPatch();
  }

  init() {
    this.renderMajor();
    this._menuPresenter.init();
  }
}
