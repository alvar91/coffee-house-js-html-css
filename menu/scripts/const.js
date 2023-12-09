const STORE_PREFIX = `coffee-house-localstorage`;
const STORE_VER = `v1`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MINOR_FORM: `MINOR_FORM`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};

export const State = {
  ADDING: `ADDING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`,
};

export const MODE = {
  buy: "buy",
};

export const FORM_MODE = {
  radio: "radio",
  checkbox: "checkbox",
}

// Consts
export const TIME_ANIMATION_DELAY_IN_MS = 500;

const initiateProducts = {
  coffee: [
    {
      id: 1,
      name: "Irish coffee",
      description:
        "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
      price: "7.00",
      category: "coffee",
      imgSrc: "../img/coffee-1",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },
      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 2,
      name: "Kahlua coffee",
      description:
        "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",
      price: "7.00",
      category: "coffee",
      imgSrc: "../img/coffee-2",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 3,
      name: "Honey raf",
      description: "Espresso with frothed milk, cream and aromatic honey",
      price: "5.50",
      category: "coffee",
      imgSrc: "../img/coffee-3",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 4,
      name: "Ice cappuccino",
      description: "Cappuccino with soft thick foam in summer version with ice",
      price: "5.00",
      category: "coffee",
      imgSrc: "../img/coffee-4",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 5,
      name: "Espresso",
      description: "Classic black coffee",
      price: "4.50",
      category: "coffee",
      imgSrc: "../img/coffee-5",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 6,
      name: "Latte",
      description:
        "Espresso coffee with the addition of steamed milk and dense milk foam",
      price: "5.50",
      category: "coffee",
      imgSrc: "../img/coffee-6",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 7,
      name: "Latte macchiato",
      description: "Espresso with frothed milk and chocolate",
      price: "5.50",
      category: "coffee",
      imgSrc: "../img/coffee-7",

      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },
    },

    {
      id: 8,
      name: "Coffee with cognac",
      description: "Fragrant black coffee with cognac and whipped cream",
      price: "6.50",
      category: "coffee",
      imgSrc: "../img/coffee-8",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },
  ],

  tea: [
    {
      id: 9,
      name: "Moroccan",
      description:
        "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",
      price: "4.50",
      category: "tea",
      imgSrc: "../img/tea-1",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 10,
      name: "Ginger",
      description: "Original black tea with fresh ginger, lemon and honey",
      price: "5.00",
      category: "tea",
      imgSrc: "../img/tea-2",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 11,
      name: "Cranberry",
      description: "Invigorating black tea with cranberry and honey",
      price: "5.00",
      category: "tea",
      imgSrc: "../img/tea-3",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 12,
      name: "Sea buckthorn",
      description:
        "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",
      price: "5.50",
      category: "tea",
      imgSrc: "../img/tea-4",
      size: {
        s: {
          name: "200 ml",
          addPrice: "0.00",
        },
        m: {
          name: "300 ml",
          addPrice: "0.50",
        },
        l: {
          name: "400 ml",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Sugar",
          addPrice: "0.50",
        },
        2: {
          name: "Cinnamon",
          addPrice: "0.50",
        },
        3: {
          name: "Syrup",
          addPrice: "0.50",
        },
      },

    },
  ],

  dessert: [
    {
      id: 13,
      name: "Marble cheesecake",
      description:
        "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",
      price: "3.50",
      category: "dessert",
      imgSrc: "../img/dessert-1",
      size: {
        s: {
          name: "50 g",
          addPrice: "0.00",
        },
        m: {
          name: "100 g",
          addPrice: "0.50",
        },
        l: {
          name: "200 g",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Berries",
          addPrice: "0.50",
        },
        2: {
          name: "Nuts",
          addPrice: "0.50",
        },
        3: {
          name: "Jam",
          addPrice: "0.50",
        },
      },

    },

    {
      id: 14,
      name: "Red velvet",
      description: "Layer cake with cream cheese frosting",
      price: "4.00",
      category: "dessert",
      imgSrc: "../img/dessert-2",
      size: {
        s: {
          name: "50 g",
          addPrice: "0.00",
        },
        m: {
          name: "100 g",
          addPrice: "0.50",
        },
        l: {
          name: "200 g",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Berries",
          addPrice: "0.50",
        },
        2: {
          name: "Nuts",
          addPrice: "0.50",
        },
        3: {
          name: "Jam",
          addPrice: "0.50",
        },
      },
    },

    {
      id: 15,
      name: "Cheesecakes",
      description:
        "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",
      price: "4.50",
      category: "dessert",
      imgSrc: "../img/dessert-3",
      size: {
        s: {
          name: "50 g",
          addPrice: "0.00",
        },
        m: {
          name: "100 g",
          addPrice: "0.50",
        },
        l: {
          name: "200 g",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Berries",
          addPrice: "0.50",
        },
        2: {
          name: "Nuts",
          addPrice: "0.50",
        },
        3: {
          name: "Jam",
          addPrice: "0.50",
        },
      },
    },

    {
      id: 16,
      name: "Creme brulee",
      description:
        "Delicate creamy dessert in a caramel basket with wild berries",
      price: "4.00",
      category: "dessert",
      imgSrc: "../img/dessert-4",
      size: {
        s: {
          name: "50 g",
          addPrice: "0.00",
        },
        m: {
          name: "100 g",
          addPrice: "0.50",
        },
        l: {
          name: "200 g",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Berries",
          addPrice: "0.50",
        },
        2: {
          name: "Nuts",
          addPrice: "0.50",
        },
        3: {
          name: "Jam",
          addPrice: "0.50",
        },
      },
    },

    {
      id: 17,
      name: "Pancakes",
      description: "Tender pancakes with strawberry jam and fresh strawberries",
      price: "4.50",
      category: "dessert",
      imgSrc: "../img/dessert-5",
      size: {
        s: {
          name: "50 g",
          addPrice: "0.00",
        },
        m: {
          name: "100 g",
          addPrice: "0.50",
        },
        l: {
          name: "200 g",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Berries",
          addPrice: "0.50",
        },
        2: {
          name: "Nuts",
          addPrice: "0.50",
        },
        3: {
          name: "Jam",
          addPrice: "0.50",
        },
      },
    },

    {
      id: 18,
      name: "Honey cake",
      description: "Classic honey cake with delicate custard",
      price: "4.50",
      category: "dessert",
      imgSrc: "../img/dessert-6",
      size: {
        s: {
          name: "50 g",
          addPrice: "0.00",
        },
        m: {
          name: "100 g",
          addPrice: "0.50",
        },
        l: {
          name: "200 g",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Berries",
          addPrice: "0.50",
        },
        2: {
          name: "Nuts",
          addPrice: "0.50",
        },
        3: {
          name: "Jam",
          addPrice: "0.50",
        },
      },
    },

    {
      id: 19,
      name: "Chocolate cake",
      description:
        "Cake with hot chocolate filling and nuts with dried apricots",
      price: "5.50",
      category: "dessert",
      imgSrc: "../img/dessert-7",
      size: {
        s: {
          name: "50 g",
          addPrice: "0.00",
        },
        m: {
          name: "100 g",
          addPrice: "0.50",
        },
        l: {
          name: "200 g",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Berries",
          addPrice: "0.50",
        },
        2: {
          name: "Nuts",
          addPrice: "0.50",
        },
        3: {
          name: "Jam",
          addPrice: "0.50",
        },
      },
    },

    {
      id: 20,
      name: "Black forest",
      description:
        "A combination of thin sponge cake with cherry jam and light chocolate mousse",
      price: "6.50",
      category: "dessert",
      imgSrc: "../img/dessert-8",
      size: {
        s: {
          name: "50 g",
          addPrice: "0.00",
        },
        m: {
          name: "100 g",
          addPrice: "0.50",
        },
        l: {
          name: "200 g",
          addPrice: "1.00",
        },
      },

      additives: {
        1: {
          name: "Berries",
          addPrice: "0.50",
        },
        2: {
          name: "Nuts",
          addPrice: "0.50",
        },
        3: {
          name: "Jam",
          addPrice: "0.50",
        },
      },
    },
  ],
};

// Store
export const InitialStoreStructure = {
  products: initiateProducts,
};
