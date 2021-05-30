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
  constructor({popupSelector, popupCloseBtnSelector, openedPopupClass, formSelector, formInputSelector, submitButtonSelector}, submitCallback) {
    super({popupSelector, popupCloseBtnSelector, openedPopupClass});
    this._submitCallBack = submitCallback;
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll(formInputSelector);
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._initialSubmitButtonText = this._submitButton.textContent;
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

  /**
   * Режим ожидания ответа от сервера. Отключает кнопку сабмита и изменяет ее текущий текст на submitButtonText
   * @param {*} handler - переключатель, булево значение. true - включает режим. false - отключает режим.
   * @param {*} submitButtonText - альтернативный текст кнопки во время ожидания. По умолчанию текст не меняется.
   */
   waitingMode(handler, submitButtonText = this._initialSubmitButtonText) {
    if (handler) {
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.textContent = submitButtonText;
    }
    else {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.textContent = this._initialSubmitButtonText;
    }
  }
}