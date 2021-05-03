const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

const cardTemplate = document.querySelector('#cardTemplate').content
const cardsContainer = document.querySelector('.photos__list')

const editPopup = document.querySelector('#editPopup')
const editPopupOpenBtn = document.querySelector('.profile__button_type_edit')
const editPopupCloseBtn = editPopup.querySelector('.popup__close-button')
const editPopupForm = editPopup.querySelector('.input')

const currentProfileName = document.querySelector('.profile__name')
const currentProfileActivity = document.querySelector('.profile__activity')
const newProfileName = editPopupForm.querySelector('.input__text_type_name')
const newProfileActivity = editPopupForm.querySelector('.input__text_type_activity')

const addPopup = document.querySelector('#addPopup')
const addPopupOpenBtn = document.querySelector('.profile__button_type_add')
const addPopupSubmitBtn = addPopup.querySelector('.input__submit-button')
const addPopupCloseBtn = addPopup.querySelector('.popup__close-button')
const addPopupForm = addPopup.querySelector('.input')
const newCardName = addPopupForm.querySelector('.input__text_type_name')
const newCardLink = addPopupForm.querySelector('.input__text_type_link')

const cardPopup = document.querySelector('#cardPopup')
const cardPopupImage = cardPopup.querySelector('.popup__image')
const cardPopupCaption = cardPopup.querySelector('.popup__image-name')
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close-button')