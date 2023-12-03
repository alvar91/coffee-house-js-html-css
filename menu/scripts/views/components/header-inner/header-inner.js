import { AbstractView } from "../../abstract-view.js";

import { BurgerTemplate } from "../../templates/burger/index.js";
import { NavTemplate } from "../../templates/nav-header/index.js";

import Utils from "../../../utils/common.js";

const navList = [
  {
    route: "#favorite",
    title: "Favorite coffee",
  },
  {
    route: "#about",
    title: "About",
  },
  {
    route: "#mobile-app",
    title: "Mobile app",
  },
  {
    route: "#contacts-us",
    title: "Contact us",
  },
];

const createHeaderInnerTemplate = () => {
  return `<div class="container header__inner">
      <a href="../" class="header__logo">
        <img class="header__logo-icon" src="../img/logo.svg" alt="Logo" />
      </a>
      <h1 class="visually-hidden">Resource Coffee House</h1>

      ${NavTemplate(navList)}

      ${BurgerTemplate()}
    </div>`;
};

export class HeaderInnerView extends AbstractView {
  constructor() {
    super();
  }

  #setBurgerClickHandler = () => {
    const $burger = this.getElement().querySelector(".js-burger-menu");
    const $list = this.getElement().querySelector(".js-nav__list");
    const $body = document.querySelector("body");

    if (!$burger || !$list) {
      console.error("No necessary elements in the Burger");
      return;
    }

    function closeMenu() {
      $burger.classList.remove("js-burger-open");
      $list.classList.remove("show-mobile-menu");

      $body.style.overflow = "auto";
      $body.style.overflowX = "hidden";
      $body.style.paddingRight = "0";
    }

    function openMenu() {
      $burger.classList.add("js-burger-open");
      $list.classList.add("show-mobile-menu");

      const paddingOffset = window.innerWidth - $body.offsetWidth + "px";
      $body.style.paddingRight = paddingOffset;

      $body.style.overflow = "hidden";
    }

    document.body.addEventListener("click", ({ target }) => {
      if (
        !target.closest(".js-burger-menu") &&
        !target.classList.contains("show-mobile-menu")
      ) {
        closeMenu();
      }
    });

    $burger.addEventListener("click", () => {
      if ($burger.classList.contains("js-burger-open")) {
        closeMenu();
        return;
      }

      openMenu();
    });

    window.addEventListener("resize", () => {
      closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      Utils.addEscapeEvent(e, closeMenu);
    });
  };

  setHandlers = () => {
    this.#setBurgerClickHandler();
  };

  getTemplate() {
    return createHeaderInnerTemplate();
  }
}
