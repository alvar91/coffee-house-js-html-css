export default class {
  static addEscapeEvent(evt, action) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      action(evt);
    }
  }

  static toast(message) {
    const SHOW_TIME = 5000;
    const toastContainer = document.createElement(`div`);
    const toastItem = document.createElement(`div`);
    toastContainer.classList.add(`toast-container`);

    document.body.append(toastContainer);

    toastItem.textContent = message;
    toastItem.classList.add(`toast-item`);

    toastContainer.append(toastItem);

    setTimeout(() => {
      toastItem.remove();
    }, SHOW_TIME);
  }

  static toUpperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static formatPrice(price) {
    const USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return USDollar.format(price);
  }

  // static createUUID() {
  //   let dt = new Date().getTime();
  //   const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
  //     /[xy]/g,
  //     function (c) {
  //       const r = (dt + Math.random() * 16) % 16 | 0;
  //       dt = Math.floor(dt / 16);
  //       return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  //     }
  //   );
  //   return uuid;
  // }

  // static generateRandomHex(len) {
  //   let output = [];
  //   for (let i = 0; i < len; ++i) {
  //     output.push(Math.floor(Math.random() * 16).toString(16));
  //   }

  //   return output.join("").toUpperCase();
  // }
}
