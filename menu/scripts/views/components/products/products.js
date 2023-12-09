import { AbstractView } from "../../abstract-view.js";

import Utils from "../../../utils/common.js";

import { TIME_ANIMATION_DELAY_IN_MS } from "../../../const.js";

const createCategoryRadioTemplate = (key, index, currentProductsCategory) => {
  return `
    <li>
      <button class="tabs__item ${
        index === currentProductsCategory ? "tabs__item--active" : ""
      } js-radio-input" id="${key}" data-path="${key}">
        <span class="tabs__circle tabs__circle--${key}"></span>
        <span class="tabs__title">${Utils.toUpperCaseFirstLetter(key)}</span>
      </button>
    </li>`;
};

const createCategoriesRadiosTemplate = (products, currentProductsCategory) => {
  return `
    <ul class="menu__tabs tabs">${Object.keys(products)
      .map((key, index) =>
        createCategoryRadioTemplate(key, index, currentProductsCategory)
      )
      .join("")}
    </ul>`;
};

const createProductsCardTemplate = ({
  id,
  name,
  description,
  price,
  imgSrc,
}) => {
  return `<li class="menu__item" data-product-id="${id}">
        <article class="menu__content">
          <div class="menu__image-container">
            <picture>
              <source type="image/webp" srcset="${imgSrc}.webp" />
              <img
                class="menu__image"
                src="${imgSrc}.jpg"
                alt="Image of the ${name}"
                loading="lazy"
              />
            </picture>
          </div>

          <div class="menu__block">
            <div class="menu__text-content">
              <h3 class="menu__heading2">${name}</h3>

              <p class="menu__text">
                ${description}
              </p>
            </div>

            <span class="menu__price">$${price}</span>
          </div>
        </article>
      </li>`;
};

const createButtonShowAll = (productsValues) => {
  if (productsValues.length > 4) {
    return `<div class="menu__container-load">
      <button class="menu__load js-display-all">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="refresh">
            <path
              id="Ellipse"
              d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8"
              stroke="#403F3D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              id="Ellipse_2"
              d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
              stroke="#403F3D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </button>
    </div>`;
  }

  return "";
};

const createProductsCardsTemplate = (products, currentProductsCategory) => {
  return Object.entries(products)
    .map(([key, productsValues], index) => {
      return `
        <div class="menu__cards ${
          index === currentProductsCategory ? "" : "hide"
        } fade js-target" data-target="${key}">
            <ul class="menu__list">${productsValues
              .map((productValue) => createProductsCardTemplate(productValue))
              .join("")}
            </ul>

            ${createButtonShowAll(productsValues)}
          </div>`;
    })
    .join("");
};

const createProductsInnerTemplate = (products, currentProductsCategory) => {
  if (!products) return `<p>Товары отсутствуют</p>`;

  return `
        ${createCategoriesRadiosTemplate(products, currentProductsCategory)}

        <div class="menu__container js-modal-product">
          ${createProductsCardsTemplate(products, currentProductsCategory)}
        </div>
    `;
};

const createProductsTemplate = (products, currentProductsCategory) => {
  return `
    <section class="menu">
        <div class="container">
            <h2 class="menu__heading">
              Behind each of our cups hides an
              <span class="accent">amazing surprise</span>
            </h2>

            ${createProductsInnerTemplate(products, currentProductsCategory)}
        </div>
    </section>`;
};

export class ProductsView extends AbstractView {
  #products;
  #currentProductsCategory;

  constructor(products, currentProductsCategory) {
    super();

    this.#products = products;
    this.#currentProductsCategory = currentProductsCategory;
  }

  getTemplate() {
    return createProductsTemplate(
      this.#products,
      this.#currentProductsCategory
    );
  }

  #sliderHandlers() {
    const inputs = this.getElement().querySelectorAll(".js-radio-input");
    const targets = this.getElement().querySelectorAll(".js-target");

    inputs.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        targets.forEach((content) => {
          content.classList.add("fade-out");

          setTimeout(() => {
            content.classList.add("hide");
            content.classList.remove("fade-out");
          }, TIME_ANIMATION_DELAY_IN_MS);
        });

        const path = e.currentTarget.dataset.path;

        this.currentCategoryChangeHandler(index);

        const selectedCategory = this.getElement().querySelector(
          `[data-target="${path}"]`
        );

        if (selectedCategory) {
          setTimeout(() => {
            selectedCategory.classList.remove("hide");
            selectedCategory.classList.add("fade");
          }, TIME_ANIMATION_DELAY_IN_MS);
        }
      });
    });
  }

  #displayAllProducts() {
    const buttons = this.getElement().querySelectorAll(".js-display-all");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.closest(".js-target");

        target.classList.add("show-all");

        button.style.display = "none";
      });
    });
  }

  #handleModalHandler(handleModalHandler) {
    const productsItems = this.getElement().querySelector(".js-modal-product");

    if (productsItems) {
      productsItems.addEventListener("click", (e) => {
        e.preventDefault();

        const productId = e.target.closest(".menu__item")?.dataset?.productId;

        if (productId) handleModalHandler(productId);
      });
    }
  }

  setHandlers({ handleModalHandler, currentCategoryChangeHandler }) {
    this.#sliderHandlers();
    this.#displayAllProducts();
    this.#handleModalHandler(handleModalHandler);
    this.currentCategoryChangeHandler = currentCategoryChangeHandler;
  }
}
