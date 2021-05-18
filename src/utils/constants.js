export const initialCards = [
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
];

export const validationSelectors = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit-button',
  inactiveButtonClass: 'input__submit-button_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: 'form__input-error_active'
};

export const nameAttribute = {
  editForm: 'editForm',
  userName: 'name',
  userCaption: 'activity',
  addForm: 'addForm',
  cardName: 'description',
  cardLink: 'link'
};

export const userInfoSelectors = {
  userInfoContainerSelector: '.profile__info',
  userNameSelector: '.profile__name',
  userCaptionSelector: '.profile__activity'
};

export const cardContainerSelector = '.photos__list';

export const editPopupOpenButtonSelector = '.profile__button_type_edit';
export const addPopupOpenButtonSelector = '.profile__button_type_add';

export const editPopupSelectors = {
  popupSelector: '#editPopup',
  popupCloseBtnSelector: '.popup__close-button',
  openedPopupClass: 'popup_opened',
  formSelector: '.input',
  formInputSelector: '.input__text'
}

export const addPopupSelectors = {
  popupSelector: '#addPopup',
  popupCloseBtnSelector: '.popup__close-button',
  openedPopupClass: 'popup_opened',
  formSelector: '.input',
  formInputSelector: '.input__text'
}

export const cardPopupSelectors = {
  popupSelector: '#cardPopup',
  popupCloseBtnSelector: '.popup__close-button',
  openedPopupClass: 'popup_opened',
  popupPhotoSelector: '.popup__image',
  popupCaptionSelector: '.popup__image-name'
}

export const cardSelectors = {
  templateSelector: '#cardTemplate',
  cardImageSelector: '.photo__image',
  cardNameSelector: '.photo__name',
  cardLikeBtnSelector: '.photo__like-button',
  cardDeleteBtnSelector: '.photo__delete-button',
  cardLikeBtnActiveClass: 'photo__like-button_active'
}