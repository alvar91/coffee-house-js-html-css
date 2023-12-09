import { AbstractView } from "../../abstract-view.js";

import Utils from "../../../utils/common.js";
import { FORM_MODE } from "../../../const.js";

const controlTemplate = (title, [key, value]) => {
  const { name, checked, type } = value;

  return `
    <li class="calculate__control control">
      <button class="control__item js-${type} ${
    checked ? "control__item--active" : ""
  }" data-target="${title}" data-key="${key}">
        <span class="control__circle">${key.toUpperCase()}</span>
        <span class="control__title">${name}</span>
      </button>
    </li>`;
};

const calculateBlockTemplate = (items) => {
  const [title, fields] = items;
  const fieldsList = Object.entries(fields);

  return `
    <div class="calculate__block">
      <span class="calculate__title">${Utils.toUpperCaseFirstLetter(
        title
      )}</span>
      <ul class="calculate__controls">
       ${fieldsList.map((field) => controlTemplate(title, field)).join("")}
      </ul>
    </div>`;
};

const createCalculateTemplate = (calculateForm, currentPrice) => {
  const calculateFormEntries = Object.entries(calculateForm);

  const [size, additives] = calculateFormEntries;

  return `
    <div>
        <div class="calculate js-calculate">
          ${calculateBlockTemplate(size)}
          ${calculateBlockTemplate(additives)}

          <div class="calculate__total">
            <span class="calculate__price-title">Total:</span>
            <span class="calculate__price-sum">${Utils.formatPrice(currentPrice)}</span>
          </div>

          <p class="calculate__disclaimer">
            The cost is not final. Download our mobile app to see the final
            price and place your order. Earn loyalty points and enjoy your
            favorite coffee with up to 20% discount.
          </p>
      </div>
    </div>`;
};

export class CalculateView extends AbstractView {
  #calculateForm;
  #currentPrice;

  constructor(calculateForm, currentPrice) {
    super();
    this.#calculateForm = calculateForm;
    this.#currentPrice = currentPrice;
  }

  getTemplate() {
    return createCalculateTemplate(this.#calculateForm, this.#currentPrice);
  }

  #changeCalculateHandler(radioChangeHandler, checkboxChangeHandler) {
    const calculate = this.getElement().querySelector(".js-calculate");

    if (calculate) {
      calculate.addEventListener("click", (e) => {
        e.preventDefault();

        const targetRadio = e.target.closest(`.js-${FORM_MODE.radio}`);
        if (targetRadio !== null) {

          const target = targetRadio?.dataset?.target;
          const key = targetRadio?.dataset?.key;

          radioChangeHandler({target, key});
          return;
        }

        const targetCheckbox = e.target.closest(`.js-${FORM_MODE.checkbox}`);

        if (targetCheckbox !== null) {
          const target = targetCheckbox?.dataset?.target;
          const key = targetCheckbox?.dataset?.key;

          checkboxChangeHandler({target, key});
          return;
        }
      });
    }
  }

  setHandlers(radioChangeHandler, checkChangeHandler) {
    this.#changeCalculateHandler(radioChangeHandler, checkChangeHandler);
  }
}
