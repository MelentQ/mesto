import {openPopup, closePopup} from './utils.js'
import Card from './card.js'
import FormValidator from './formValidator.js'

initialCards.forEach((card) => {
  const cardItem = new Card(card.name, card.link, '#cardTemplate')
  cardsContainer.append(cardItem.generateCard())
})

function saveChanges(evt) {
  evt.preventDefault()
  currentProfileName.textContent = newProfileName.value;
  currentProfileActivity.textContent = newProfileActivity.value;
  closePopup(editPopup)
}

editPopupOpenBtn.addEventListener('click', () => {
  newProfileName.value = currentProfileName.textContent;
  newProfileActivity.value = currentProfileActivity.textContent;
  openPopup(editPopup)
})
editPopupCloseBtn.addEventListener('click', () => closePopup(editPopup))
editPopupForm.addEventListener('submit', saveChanges)

addPopupOpenBtn.addEventListener('click', () => {
  addPopupForm.reset()
  //Отключим кнопку добавления карточки при открытии попапа
  //и добавим соответствующий класс
  addPopupSubmitBtn.setAttribute('disabled', true)
  addPopupSubmitBtn.classList.add('input__submit-button_disabled')
  openPopup(addPopup)
})
addPopupCloseBtn.addEventListener('click', () => closePopup(addPopup))
addPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  
  const cardItem = new Card(newCardName.value, newCardLink.value, '#cardTemplate')
  cardsContainer.prepend(cardItem.generateCard())
  closePopup(addPopup)
})


// VALIDATION
const formList = Array.from(document.querySelectorAll('.input'));

formList.forEach((formElement) => {
  const formValidator = new FormValidator({
    formSelector: '.input',
    inputSelector: '.input__text',
    submitButtonSelector: '.input__submit-button',
    inactiveButtonClass: 'input__submit-button_disabled',
    inputErrorClass: 'input__text_type_error',
    errorClass: 'form__input-error_active'
  }, formElement)

  formValidator.enableValidation();
})