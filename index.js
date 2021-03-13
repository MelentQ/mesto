let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__button_type_edit');
let popupCloseBtn = document.querySelector('.popup__close-button');
let popupChangeBtn = document.querySelector('.input__submit-button');

let currentProfileName = document.querySelector('.profile__name');
let currentProfileActivity = document.querySelector('.profile__activity');
let newProfileName = document.querySelector('.input__text_type_name');
let newProfileActivity = document.querySelector('.input__text_type_activity');

function UnhidePopup() {
  popup.classList.add('popup_show')
}

function HidePopup() {
  popup.classList.remove('popup_show');
}

function SaveChanges() {
  currentProfileName.textContent = newProfileName.value;
  currentProfileActivity.textContent = newProfileActivity.value;
}

popupOpenBtn.addEventListener('click', UnhidePopup);
popupCloseBtn.addEventListener('click', HidePopup);
popupChangeBtn.addEventListener('click', function() {
  SaveChanges()
  HidePopup()
});