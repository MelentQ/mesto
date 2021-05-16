export default class Popup {
  /**
   * Класс Popup отвечает за открытие и закрытие попапа
   * @param {*} popupSelector - селектор контейнера попапа
   * @param {*} popupCloseBtnSelector - селектор кнопки закрытия
   * @param {*} openedPopupClass - CSS класс, который добавляется для открытия попапа
   */
  constructor(popupSelector, popupCloseBtnSelector, openedPopupClass) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(popupCloseBtnSelector);
    this._openedPopupClass = openedPopupClass;
  }

  /**
   * Открывает модальное окно
   */
  open() {
    this._popup.classList.add(this._openedPopupClass)
  }

  /**
   * Закрывает модальное окно
   */
  close() {
    this._popup.classList.remove(this._openedPopupClass);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClickClose(evt) {
    if(evt.target.classList.contains(this._openedPopupClass)) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handleOverlayClickClose.bind(this));
  }

  removeEventListeners() {
    this._popupCloseBtn.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClickClose);
  }
}