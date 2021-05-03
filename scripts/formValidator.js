export default class FormValidator {
  /**
   * 
   * @param {Object} selectors - Селекторы, их очень много...
   * @param {*} formElement - Элемент формы, который надо валидировать
   */
  constructor(selectors, formElement) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;

    this._formElement = formElement;
  }

  /**
   * Включает валидацию элемента формы formElement
   */
  enableValidation() {
    this._setEventListeners()
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', evt => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  _toggleButtonState() {
    if (this._isInputListInvalid(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true)
      this._buttonElement.classList.add(this._inactiveButtonClass)
    }
    else {
      this._buttonElement.removeAttribute('disabled')
      this._buttonElement.classList.remove(this._inactiveButtonClass)
    }
  }

  _isInputListInvalid() {
    return this._inputList.some(
      inputElement => !inputElement.validity.valid
    )
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    }
    else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass)
  }
  
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass)
  }
}