export class Slider {
  #slider;
  #sliderContainer;
  #slides;
  #slidesCount;
  #buttonsContainer;
  #prevSlideButton;
  #nextSlideButton;

  #sliderWrapperSelector;

  // Номер аквтиного слайда по умолчанию
  #initialActiveSlideNumber = 1;

  // Активная точка
  #activeDot = null;

  // Ширина одного слайда (px)
  #slideWidthMobile = 348;
  #slideWidth = 480;

  #mobileSize = 767;

  // Текущее перемещение слайдов вдоль оси x
  #currentTranslate = 0;

  // Идентификатор таймера
  #timerId = null;

  // Пройденные проценты
  #percents = 0;

  // Лимит, при котором слайды переворачиваются
  #limitPercents = 100;

  // Интервал времени, при котором происходит перелистывание
  #timeLeaf = 100;

  // Количество слайдов при десктопе
  // #desktopDotsCount = 3;

  #touchStartX = 0;
  #touchEndX = 0;

  constructor({
    sliderSelector,
    sliderContainerSelector,
    slidesSelector,
    buttonsContainerSelector,
    prevSlideButtonSelector,
    nextSlideButtonSelector,

    sliderWrapperSelector,
  }) {
    this.#slider = document.querySelector(sliderSelector);
    this.#sliderContainer = document.querySelector(sliderContainerSelector);
    this.#slides = document.querySelectorAll(slidesSelector);
    this.#slidesCount = this.#slides.length;
    this.#buttonsContainer = document.querySelector(buttonsContainerSelector);
    this.#prevSlideButton = document.querySelector(prevSlideButtonSelector);
    this.#nextSlideButton = document.querySelector(nextSlideButtonSelector);

    this.#sliderWrapperSelector = document.querySelector(sliderWrapperSelector);
  }

  get getSlideWidth() {
    if (window.matchMedia(`(max-width: ${this.#mobileSize}px)`).matches) {
      return this.#slideWidthMobile;
    }

    return this.#slideWidth;
  }

  #createButtons = () => {
    const $buttons = document.createDocumentFragment();

    for (let i = 1; i <= this.#slidesCount; i++) {
      const element = document.createElement("div");

      // element.innerHTML = `
      //     <button class="pagination__dot ${
      //       i === this.#initialActiveSlideNumber
      //         ? "pagination__dot--active"
      //         : ""
      //     } js-slide-button" data-dot-id="${i}">
      //       <div class="bullet"></div>
      //     </button>
      //   `;

      element.innerHTML = `
          <div class="pagination__dot ${
            i === this.#initialActiveSlideNumber
              ? "pagination__dot--active"
              : ""
          } js-slide-button" data-dot-id="${i}">
            <div class="bullet">
              <div class="range js-range"></div>
            </div>
          </div>
        `;

      $buttons.appendChild(element.firstElementChild);
    }

    this.#buttonsContainer.appendChild($buttons);

    this.#activeDot = this.#slider.querySelector(".pagination__dot--active");
  };

  #prevSlideLeaf = () => {
    // Получаем id предыдущего дота
    const dotId = this.#activeDot.dataset.dotId - 1;

    this.#translateSlides(dotId);
  };

  #nextSlideLeaf = () => {
    // Получаем id следующего дота
    const dotId = Number(this.#activeDot.dataset.dotId) + 1;

    this.#translateSlides(dotId);
  };

  //Функция для перемещения слайдов вдоль оси x
  #translateSlides = (dotId) => {
    // Сбрасываем выполненные проценты
    this.#percents = 0;

    // Сбрасываем состояние текущего range
    this.#resetRange();

    // Если слайд оказывается за пределами слайдера
    if (dotId < 1) dotId = this.#slidesCount;
    else if (dotId > this.#slidesCount) dotId = 1;

    // if (dotId > 1 && dotId < this.#slidesCount) {
    //   this.#prevSlideButton.disabled = false;
    //   this.#nextSlideButton.disabled = false;
    // } else {
    //   if (dotId <= 1) {
    //     this.#prevSlideButton.disabled = true;
    //     this.#nextSlideButton.disabled = false;
    //   }

    //   if (dotId >= this.#slidesCount) {
    //     this.#prevSlideButton.disabled = false;
    //     this.#nextSlideButton.disabled = true;
    //   }
    // }

    // Выбираем новый дот в DOM
    const currentDot = this.#slider.querySelector(
      `.js-slide-button[data-dot-id="${dotId}"]`
    );

    const currentDotId = currentDot.dataset.dotId;
    const activeDotDotId = this.#activeDot.dataset.dotId;
    const difDotId = Math.abs(activeDotDotId - currentDotId);

    if (activeDotDotId > currentDotId) {
      this.#currentTranslate =
        this.#currentTranslate + difDotId * this.getSlideWidth;
      this.#sliderContainer.style.transform = `translateX(${
        this.#currentTranslate
      }px)`;
    } else {
      this.#currentTranslate =
        this.#currentTranslate - difDotId * this.getSlideWidth;
      this.#sliderContainer.style.transform = `translateX(${
        this.#currentTranslate
      }px)`;
    }

    // Добавляем активный класс к новому доту и убираем активный класс с прежнего дота
    // this.#activeDot.classList.remove("pagination__dot--active");
    // currentDot.classList.add("pagination__dot--active");

    // Назначаем новый дот активным
    this.#activeDot = currentDot;
  };

  #prevArrowHandler = (e) => {
    e.stopPropagation();

    this.#prevSlideLeaf();
  };

  #nextArrowHandler = (e) => {
    e.stopPropagation();

    this.#nextSlideLeaf();
  };

  // #dotsHandler = (e) => {
  //   e.stopPropagation();

  //   // Получаем id нажатого дота
  //   const dotId = e.target.dataset.dotId;

  //   if (!dotId) {
  //     console.error("Clicked dot don`t have dotId dataset");
  //     return;
  //   }

  //   // Если нажатый дот уже является текущим, то прерываем выполнение функции
  //   if (this.#activeDot.dataset.dotId === dotId) return;

  //   // Вызываем функцию для переноса слайдов
  //   this.#translateSlides(dotId);
  // };

  #pauseAutoTranslate = () => {
    clearInterval(this.#timerId);

    this.#timerId = null;
  };

  #updateRange = () => {
    const currentRange = this.#activeDot.querySelector(".js-range");
    currentRange.style.width = `${this.#percents}%`;
  };

  #resetRange = () => {
    const currentRange = this.#activeDot.querySelector(".js-range");
    currentRange.style.width = `0px`;
  };

  #playAutoTranslate = () => {
    this.#timerId = setInterval(() => {
      this.#percents++;

      if (this.#percents > this.#limitPercents) {
        this.#nextSlideLeaf();
      } else {
        this.#updateRange();
      }
    }, this.#timeLeaf);
  };

  #checkSwipeDirection = () => {
    if (this.#touchStartX > this.#touchEndX) {
      this.#nextSlideLeaf();
    } else if (this.#touchStartX < this.#touchEndX) {
      this.#prevSlideLeaf();
    }
  };

  #startTouch = (e) => {
    e.stopPropagation();

    this.#touchStartX = e.changedTouches[0].clientX;
  };

  #endTouch = (e) => {
    e.stopPropagation();

    this.#touchEndX = e.changedTouches[0].clientX;

    this.#checkSwipeDirection();
  };

  #initAutoTranslateListeners = () => {
    this.#sliderWrapperSelector.addEventListener(
      "mouseover",
      this.#pauseAutoTranslate
    );
    this.#sliderWrapperSelector.addEventListener(
      "mouseout",
      this.#playAutoTranslate
    );
    this.#sliderWrapperSelector.addEventListener(
      "touchstart",
      this.#pauseAutoTranslate
    );
    this.#sliderWrapperSelector.addEventListener(
      "touchend",
      this.#playAutoTranslate
    );

    this.#sliderWrapperSelector.addEventListener("touchstart", (e) =>
      this.#startTouch(e)
    );
    this.#sliderWrapperSelector.addEventListener("touchend", (e) =>
      this.#endTouch(e)
    );
  };

  #initAutoTranslate = () => {
    this.#initAutoTranslateListeners();

    this.#playAutoTranslate();
  };

  #addEventListeners = () => {
    // Обработчики на стрелки и доты
    this.#prevSlideButton.addEventListener("click", this.#prevArrowHandler);
    this.#nextSlideButton.addEventListener("click", this.#nextArrowHandler);
    // this.#buttonsContainer.addEventListener("click", this.#dotsHandler);

    // Обработчик сброса слайдера на первый слайд в случае ресайза
    window.addEventListener("resize", () => {
      //   if (this.#activeDot.dataset.dotId > this.#desktopDotsCount) {
      // const activeDotDotId = this.#activeDot.dataset.dotId;
      const firstNumberSlide = 1;
      this.#translateSlides(firstNumberSlide);
      //   }
    });
  };

  #initSlider = () => {
    if (
      !this.#slider ||
      !this.#slidesCount ||
      !this.#sliderContainer ||
      !this.#buttonsContainer ||
      !this.#prevSlideButton ||
      !this.#nextSlideButton ||
      !this.#sliderWrapperSelector
    ) {
      console.error("No necessary elements in layout for slider");
      return;
    }

    this.#createButtons();

    // Блокируем кнопки-стрелки, если текущий слайд достиг пределов
    // if (this.#initialActiveSlideNumber <= 1) {
    //   this.#prevSlideButton.disabled = true;
    // }

    // if (this.#initialActiveSlideNumber >= this.#slidesCount) {
    //   this.#nextSlideButton.disabled = true;
    // }

    this.#addEventListeners();

    this.#initAutoTranslate();
  };

  init() {
    this.#initSlider();
  }
}
