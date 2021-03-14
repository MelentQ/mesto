let popup = document.querySelector('.popup')
let popupContent = document.querySelector('.popup__content')
let popupOpenBtn = document.querySelector('.profile__button_type_edit')
let popupCloseBtn = document.querySelector('.popup__close-button')
let popupChangeBtn = document.querySelector('.input__submit-button')

let currentProfileName = document.querySelector('.profile__name')
let currentProfileActivity = document.querySelector('.profile__activity')
let newProfileName = document.querySelector('.input__text_type_name')
let newProfileActivity = document.querySelector('.input__text_type_activity')

function OpenPopup() {
  newProfileName.value = currentProfileName.textContent;
  newProfileActivity.value = currentProfileActivity.textContent;
  popup.classList.add('popup_opened')
}

function ClosePopup() {
  popup.classList.remove('popup_opened')
}

function SaveChanges() {
  currentProfileName.textContent = newProfileName.value;
  currentProfileActivity.textContent = newProfileActivity.value;
}

popupOpenBtn.addEventListener('click', OpenPopup)
popupCloseBtn.addEventListener('click', ClosePopup)
popupChangeBtn.addEventListener('click', function() {
  SaveChanges()
  ClosePopup()
})

//Нажатие на overlay приводит к закрытию попапа.
popup.addEventListener('click', ClosePopup)
popupContent.addEventListener('click', function(e) {
  e.preventDefault()
  e.stopImmediatePropagation()
})