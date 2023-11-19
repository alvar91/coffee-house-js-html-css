import { Burger } from "./components/burger.js";

export default class App {
  init() {
    const burger = new Burger({
      burgerSelector: ".js-burger-menu",
      burgerOpenSelector: ".js-burger-open",
      showMobileMenuSelector: ".show-mobile-menu",
      listSelector: ".js-nav__list",
    });
    burger.init();
  }
}
