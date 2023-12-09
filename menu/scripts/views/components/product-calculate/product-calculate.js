import { AbstractView } from "../../abstract-view.js";

const createProductTemplate = (currentProduct) => {
  if(!currentProduct) return `<p>Товар отсутствует</p>`;

  const { imgSrc, name, description } = currentProduct;

  return `
    <div class="popup__inner">
      <div class="popup__left">
        <div class="popup__image-container">
          <picture>
            <source type="image/webp" srcset="${imgSrc}.webp" />
            <img
              class="popup__image"
              src="${imgSrc}.jpg"
              alt="Image of the ${name}"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
      <div class="popup__right">
        <h3 class="popup__heading">${name}</h3>
        <p class="popup__text">${description}</p>

        <div class="popup__calculate-inner js-calculate"></div>

        <button class="calculate__close-btn js-modal-close">Close</button>
      </div>
    </div>`;
};

export class ProductCalculateView extends AbstractView {
  #handler;
  #currentProduct;

  constructor(currentProduct) {
    super();
    this.#handler = {};
    this.#currentProduct = currentProduct;
  }

  getTemplate() {
    return createProductTemplate(
      this.#currentProduct
    );
  }

  #closeModalClickHandler = (evt) => {
    if (
      evt.target.classList.contains("js-modal-close")
    ) {
      evt.stopPropagation();
      evt.preventDefault();

      this.#handler.click();
    }
  };

  setCloseModalClickHandler(handler) {
    this.#handler.click = handler;

    this.getElement().addEventListener(`click`, this.#closeModalClickHandler);
  }

  getCalculateModalContainer() {
    return this.getElement().querySelector(`.js-calculate`);
  }
}
