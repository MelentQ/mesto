import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /**
   * Попап с формой
   * @param {*} popupSelector - селектор контейнера попапа
   * @param {*} popupCloseBtnSelector - селектор кнопки закрытия
   * @param {*} openedPopupClass - CSS класс, который добавляется для открытия попапа
   * @param {*} submitCallback - колбэк сабмита формы
   * @param {*} formSelector селектор формы
   * @param {*} formInputSelector селектор полей ввода формы
   */
  constructor({popupSelector, popupCloseBtnSelector, openedPopupClass, formSelector, formInputSelector}, submitCallback) {
    super({popupSelector, popupCloseBtnSelector, openedPopupClass});
    this._submitCallBack = submitCallback;
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll(formInputSelector);
  }

  /**
   * 
   * @returns Возвращает объект. Ключи - атрибуты name полей ввода, значения - значения полей ввода.
   */
  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._submitCallBack.bind(this));
  }

  /**
   * Закрывает модальное окно
   */
  close() {
    super.close();

    this._form.reset();
  }
}