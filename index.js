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

//Переключатель темы
let page = document.querySelector('.page');
let themeSwitcher = document.querySelector('.theme-switcher');
let themeSwitcherBtn = document.querySelector('.theme-switcher__button');


let headerLogo = document.querySelector('.header__logo');
let editIcon = document.querySelector('.icon_type_edit');
let addIcon = document.querySelector('.icon_type_add');
let likeBtn = document.querySelectorAll('.photo__like-button');
let likeBtnActive = document.querySelectorAll('.photo__like-button_active');

function SwitchTheme() {
  page.classList.toggle('theme_color_dark')
  page.classList.toggle('theme_color_light')
  themeSwitcher.classList.toggle('theme-switcher_theme-dark')
  themeSwitcher.classList.toggle('theme-switcher_theme-light')


  headerLogo.classList.toggle('header__logo_theme_light')
  editIcon.classList.toggle('icon_type_edit-theme-light')
  addIcon.classList.toggle('icon_type_add-theme-light')
  for(let i=0; i< likeBtn.length; i++) {
    likeBtn[i].classList.toggle('photo__like-button_theme_light')
  }
  for(let i=0; i< likeBtnActive.length; i++) {
    likeBtnActive[i].classList.toggle('photo__like-button_active-theme-light')
  }
}

themeSwitcher.addEventListener('click', SwitchTheme)
themeSwitcherBtn.addEventListener('click', function(e) {
  e.preventDefault()
  e.stopImmediatePropagation()
  SwitchTheme()
})