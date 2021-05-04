import {openPopup, closePopup} from './utils.js'
import Card from './card.js'
import FormValidator from './formValidator.js'

initialCards.forEach((card) => {
  const cardItem = new Card(card.name, card.link, '#cardTemplate')
  cardsContainer.append(cardItem.generateCard())
})

// VALIDATION
const validationSelectors = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit-button',
  inactiveButtonClass: 'input__submit-button_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: 'form__input-error_active'
}

const addPopupFormValidator = new FormValidator(validationSelectors, addPopupForm);
addPopupFormValidator.enableValidation();
const editPopupFormValidator = new FormValidator(validationSelectors, editPopupForm);
editPopupFormValidator.enableValidation();
// /VALIDATION

function saveChanges(evt) {
  evt.preventDefault()
  currentProfileName.textContent = newProfileName.value;
  currentProfileActivity.textContent = newProfileActivity.value;
  closePopup(editPopup)
}

editPopupOpenBtn.addEventListener('click', () => {
  newProfileName.value = currentProfileName.textContent;
  newProfileActivity.value = currentProfileActivity.textContent;
  //Проверим валидность полей ввода
  editPopupFormValidator.checkInputValidity(newProfileName);
  editPopupFormValidator.checkInputValidity(newProfileActivity);
  //Включим или отключим кнопку сабмита
  editPopupFormValidator.toggleButtonState();
  openPopup(editPopup);
})
editPopupCloseBtn.addEventListener('click', () => closePopup(editPopup))
editPopupForm.addEventListener('submit', saveChanges)

addPopupOpenBtn.addEventListener('click', () => {
  addPopupForm.reset();
  //Скроем сообщение об ошибке
  addPopupFormValidator.hideInputError(newCardName);
  addPopupFormValidator.hideInputError(newCardLink);
  //Отключим кнопку добавления карточки при открытии попапа
  addPopupFormValidator.disableSubmitButton();
  openPopup(addPopup);
})
addPopupCloseBtn.addEventListener('click', () => closePopup(addPopup))
addPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  
  const cardItem = new Card(newCardName.value, newCardLink.value, '#cardTemplate')
  cardsContainer.prepend(cardItem.generateCard())
  closePopup(addPopup)
})
cardPopupCloseBtn.addEventListener('click', () => closePopup(cardPopup))