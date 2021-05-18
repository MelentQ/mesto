import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /**
   * Попап с изображением и подписью
   * @param {*} popupSelector - селектор контейнера попапа
   * @param {*} popupCloseBtnSelector - селектор кнопки закрытия
   * @param {*} openedPopupClass - CSS класс, который добавляется для открытия попапа
   * @param {*} popupPhotoSelector - селектор контейнера для изображения
   * @param {*} popupCaptionSelector - селектор контейнера для подписи к изображению
   */
  constructor({popupSelector, popupCloseBtnSelector, openedPopupClass, popupPhotoSelector, popupCaptionSelector}) {
    super({popupSelector, popupCloseBtnSelector, openedPopupClass});
    this._popupPhotoContainer = this._popup.querySelector(popupPhotoSelector);
    this._popupCaptionContainer = this._popup.querySelector(popupCaptionSelector);
  }

  /**
   * Открывает модальное окно c изображением и подписью
   * @param {*} name - подпись к изображению
   * @param {*} link - URL адрес изображения
   */
  open(name, link) {
    this._popupPhotoContainer.src = link;
    this._popupPhotoContainer.alt = name;
    this._popupCaptionContainer.textContent = name;

    super.open();
  }
}