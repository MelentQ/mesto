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

export const cardSelectors = {
  cardImageSelector: '.photo__image',
  cardNameSelector: '.photo__name',
  cardLikeBtnSelector: '.photo__like-button',
  cardDeleteBtnSelector: '.photo__delete-button',
};
export const cardLikeBtnActiveClass = 'photo__like-button_active';

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

export const formSelectors = {
  formSelector: '.input',
  formInputSelector: '.input__text'
};

export const popupSelectors = {
  editPopup: '#editPopup',
  addPopup: '#addPopup',
  cardPopup: '#cardPopup',
  popupCloseBtn: '.popup__close-button',
  popupImage: '.popup__image',
  popupImageCaption: '.popup__image-name'
};

export const openedPopupClass = 'popup_opened';
export const cardTemplateSelector = '#cardTemplate';
export const cardContainerSelector = '.photos__list';

export const editPopupOpenButtonSelector = '.profile__button_type_edit';
export const addPopupOpenButtonSelector = '.profile__button_type_add';