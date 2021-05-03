import {openPopup, closePopup} from './utils.js'

export default class Card {
  /**
   * 
   * @param {*} name - Подпись изображения
   * @param {*} imageLink - Ссылка на изображение (URL)
   * @param {*} templateSelector - Селектор шаблона карточки
   */
  constructor(name, imageLink, templateSelector) {
    this._name = name;
    this._image = imageLink;
    this.isLiked = false;

    this._templateSelector = templateSelector;

    this._element = this._getTemplateBySelector(templateSelector);
    this._cardImage = this._element.querySelector('.photo__image');
    this._likeBtn = this._element.querySelector('.photo__like-button');
    this._deleteBtn = this._element.querySelector('.photo__delete-button');

    this._cardPopup = document.querySelector('#cardPopup');
    this._cardPopupCloseBtn = this._cardPopup.querySelector('.popup__close-button')
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

    this._element.querySelector('.photo__image').src = this._image;
    this._element.querySelector('.photo__image').alt = this._name;

    this._element.querySelector('.photo__name').textContent = this._name;

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
      this._openImagePopup();
    })

    this._cardPopupCloseBtn.addEventListener('click', () => {
      closePopup(this._cardPopup)
    })
  }

  _toggleLike() {
    this.isLiked = !this.isLiked;
    this._likeBtn.classList.toggle('photo__like-button_active');
    this._likeBtn.blur(); //Removes focus on element after click
  }

  _deleteCard() {
    this._element.remove();
  }

  _openImagePopup() {
    const cardPopupImage = this._cardPopup.querySelector('.popup__image');
    const cardPopupCaption = this._cardPopup.querySelector('.popup__image-name');

    cardPopupImage.src = this._image;
    cardPopupImage.alt = this._name;
    cardPopupCaption.textContent = this._name;
    openPopup(this._cardPopup);
  }
}