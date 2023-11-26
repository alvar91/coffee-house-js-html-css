export class Burger {
  #burger;
  #list;

  #burgerSelector = null;
  #burgerOpenSelector = null;
  #showMobileMenuSelector = null;

  #body = document.querySelector("body");

  constructor({
    burgerSelector,
    burgerOpenSelector,
    showMobileMenuSelector,
    listSelector,
  }) {
    this.#burgerSelector = burgerSelector;

    this.#burgerOpenSelector = burgerOpenSelector.slice(1);
    this.#showMobileMenuSelector = showMobileMenuSelector.slice(1);

    this.#burger = document.querySelector(burgerSelector);
    this.#list = document.querySelector(listSelector);
  }

  #closeMenu = () => {
    this.#burger.classList.remove(this.#burgerOpenSelector);
    this.#list.classList.remove(this.#showMobileMenuSelector);

    this.#body.style.overflowX = "hidden";
    this.#body.style.paddingRight = "0";
  };

  #openMenu = () => {
    this.#burger.classList.add(this.#burgerOpenSelector);
    this.#list.classList.add(this.#showMobileMenuSelector);

    const paddingOffset = window.innerWidth - this.#body.offsetWidth + "px";
    this.#body.style.paddingRight = paddingOffset;

    this.#body.style.overflow = "hidden";
  };

  #addEventListeners = () => {
    // В случае клика вне меню, закрываем его
    document.body.addEventListener("click", ({ target }) => {
      if (
        !target.closest(this.#burgerSelector) &&
        !target.classList.contains(this.#showMobileMenuSelector)
      ) {
        this.#closeMenu();
      }
    });

    // В случае клика по бургеру, закрываем меню
    this.#burger.addEventListener("click", () => {
      if (this.#burger.classList.contains(this.#burgerOpenSelector)) {
        this.#closeMenu();
        return;
      }

      this.#openMenu();
    });

    // В случае ресайза, закрываем меню
    window.addEventListener("resize", this.#closeMenu);

    // В случае нажатия на Esc, закрываем меню

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.#closeMenu();
    });
  };

  #initBurger = () => {
    if (!this.#burger || !this.#list) {
      console.error("No necessary elements in layout for burger");
      return;
    }

    this.#addEventListeners();
  };

  init() {
    this.#initBurger();
  }
}
