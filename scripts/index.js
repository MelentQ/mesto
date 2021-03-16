let popupOpenBtn = document.querySelector('.profile__button_type_edit')
let popup = document.querySelector('.popup')
let popupContainer = popup.querySelector('.popup__container')
let popupCloseBtn = popupContainer.querySelector('.popup__close-button')
let editForm = popupContainer.querySelector('.input')

let currentProfileName = document.querySelector('.profile__name')
let currentProfileActivity = document.querySelector('.profile__activity')
let newProfileName = editForm.querySelector('.input__text_type_name')
let newProfileActivity = editForm.querySelector('.input__text_type_activity')

function openPopup() {
  newProfileName.value = currentProfileName.textContent;
  newProfileActivity.value = currentProfileActivity.textContent;
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function saveChanges(evt) {
  evt.preventDefault();
  currentProfileName.textContent = newProfileName.value;
  currentProfileActivity.textContent = newProfileActivity.value;
  closePopup()
}

popupOpenBtn.addEventListener('click', openPopup)
popupCloseBtn.addEventListener('click', closePopup)
editForm.addEventListener('submit', saveChanges)