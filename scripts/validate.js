function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass)
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass)
}

/**
 * Проверяет поле ввода inputElement на валидность.
 * Если поле невалидно, выводит ошибку.
 * @param {*} formElement - элемент формы, внутри которого поле ввода inputElement
 * @param {*} inputElement - поле ввода
 */
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
  else {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  }
}

/**
 * Возвращает true, если хотя бы одно из полей ввода массива inputList невалидно
 * Иначе false
 * @param {*} inputList - массив полей ввода для проверки
 * @returns true / false
 */
function isInputListInvalid(inputList) {
  return inputList.some(
    inputElement => !inputElement.validity.valid
  )
}


/**
 * Отключает кнопку buttonElement, если хотя бы одно поле ввода массива inputList невалидно,
 * иначе включает кнопку
 * @param {*} inputList - массив полей ввода для проверки
 * @param {*} buttonElement - кнопка отправки формы
 */
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (isInputListInvalid(inputList)) {
    buttonElement.setAttribute('disabled', true)
    buttonElement.classList.add(inactiveButtonClass)
  }
  else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(inactiveButtonClass)
  }
}



/**
 * Добавляет обработчики событий полям ввода формы с классом .input__text
 * @param {*} formElement - элемент формы
 */
function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector)

  toggleButtonState(inputList, buttonElement, inactiveButtonClass)

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', evt => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass, errorClass)
    })
  })
}

/**
 * Включает валидацию всех форм с классом formSelector ...
 */
function EnableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
  })
}