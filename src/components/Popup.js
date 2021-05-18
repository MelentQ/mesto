export default class Popup {
  /**
   * Класс Popup отвечает за открытие и закрытие попапа
   * @param {*} popupSelector - селектор контейнера попапа
   * @param {*} popupCloseBtnSelector - селектор кнопки закрытия
   * @param {*} openedPopupClass - CSS класс, который добавляется для открытия попапа
   */
  constructor({popupSelector, popupCloseBtnSelector, openedPopupClass}) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(popupCloseBtnSelector);
    this._openedPopupClass = openedPopupClass;

    // Танцы с бубном
    this._bindedHandleEscClose = this._handleEscClose.bind(this);
    this._bindedOverlayClickClose = this._handleOverlayClickClose.bind(this);
  }

  /**
   * Открывает модальное окно
   */
  open() {
    this._setHandleListeners();
    this._popup.classList.add(this._openedPopupClass)
  }

  /**
   * Закрывает модальное окно
   */
  close() {
    this._removeHandleListeners();
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
  }

  _setHandleListeners() {
    document.addEventListener('keydown', this._bindedHandleEscClose);
    document.addEventListener('click', this._bindedOverlayClickClose);
  }
  

  _removeHandleListeners() {
    document.removeEventListener('keydown', this._bindedHandleEscClose);
    document.removeEventListener('click', this._bindedOverlayClickClose);
  }
}