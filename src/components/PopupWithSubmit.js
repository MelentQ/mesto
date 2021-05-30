import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({popupSelector, popupCloseBtnSelector, openedPopupClass, formSelector, submitButtonSelector}) {
    super({popupSelector, popupCloseBtnSelector, openedPopupClass});
    this._form = this._popup.querySelector(formSelector);
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._initialSubmitButtonText = this._submitButton.textContent;
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
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