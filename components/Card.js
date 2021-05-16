export default class Card {
  /**
   * 
   * @param {*} name - Подпись изображения
   * @param {*} imageLink - Ссылка на изображение (URL)
   * @param {*} templateSelector - Селектор шаблона карточки
   * @param {*} handleCardClick - колбэк функция при нажатии на карточку
   */
  constructor(name, imageLink, templateSelector, handleCardClick, cardSelectors, cardLikeBtnActiveClass) {
    this.name = name;
    this.image = imageLink;
    this.isLiked = false;

    this._element = this._getTemplateBySelector(templateSelector);
    this._cardImage = this._element.querySelector(cardSelectors.cardImageSelector);
    this._cardName = this._element.querySelector(cardSelectors.cardNameSelector);
    this._likeBtn = this._element.querySelector(cardSelectors.cardLikeBtnSelector);
    this._deleteBtn = this._element.querySelector(cardSelectors.cardDeleteBtnSelector);

    this._handleCardClick = handleCardClick;
    this._cardLikeBtnActiveClass = cardLikeBtnActiveClass;
  }

  _getTemplateBySelector(templateSelector) {
    return document
    .querySelector(templateSelector)
    .content
    .children[0]
    .cloneNode(true);
  }

  /**
   * 
   * @returns Возвращает готовый объект Card
   */
  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this.image;
    this._cardImage.alt = this.name;

    this._cardName.textContent = this.name;

    return this._element;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._toggleLike();
    })

    this._deleteBtn.addEventListener('click', () => {
      this._deleteCard();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  _toggleLike() {
    this.isLiked = !this.isLiked;
    this._likeBtn.classList.toggle(this._cardLikeBtnActiveClass);
    this._likeBtn.blur(); //Removes focus on element after click
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}