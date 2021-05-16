import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /**
   * Попап с изображением и подписью
   * @param {*} popupSelector - селектор контейнера попапа
   * @param {*} popupCloseBtnSelector - селектор кнопки закрытия
   * @param {*} openedPopupClass - CSS класс, который добавляется для открытия попапа
   * @param {*} popupPhotoSelector - селектор контейнера для изображения
   * @param {*} popupPhotoURL - URL адрес изображения
   * @param {*} popupCaptionSelector - селектор контейнера для подписи к изображению
   * @param {*} popupCaption - подпись изображения, строка
   */
  constructor(popupSelector, popupCloseBtnSelector, openedPopupClass, popupPhotoSelector, popupPhotoURL, popupCaptionSelector, popupCaption) {
    super(popupSelector, popupCloseBtnSelector, openedPopupClass);
    this._popupPhotoContainer = this._popup.querySelector(popupPhotoSelector);
    this._popupPhotoURL = popupPhotoURL;
    this._popupCaptionContainer = this._popup.querySelector(popupCaptionSelector);
    this._popupCaption = popupCaption;
  }

  /**
   * Открывает модальное окно
   */
  open() {
    this._popupPhotoContainer.src = this._popupPhotoURL;
    this._popupPhotoContainer.alt = this._popupCaption;
    this._popupCaptionContainer.textContent = this._popupCaption;

    super.open();
  }
}