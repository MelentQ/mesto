export const apiAddress = 'https://mesto.nomoreparties.co/v1/cohort-24';
export const apiToken = '68a2e8bf-41f6-4309-86d1-09aae1dd8e56';

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
  cardLink: 'link',
  avatarForm: 'avatarForm',
  avatarLink: 'link'};

export const userInfoSelectors = {
  userInfoContainerSelector: '.profile',
  userNameSelector: '.profile__name',
  userCaptionSelector: '.profile__activity',
  userAvatarSelector: '.profile__avatar'
};

export const cardContainerSelector = '.photos__list';

export const editPopupOpenButtonSelector = '.profile__button_type_edit';
export const addPopupOpenButtonSelector = '.profile__button_type_add';
export const editAvatarButtonSelector = '.profile__avatar-btn';

export const editPopupSelectors = {
  popupSelector: '#editPopup',
  popupCloseBtnSelector: '.popup__close-button',
  openedPopupClass: 'popup_opened',
  formSelector: '.input',
  formInputSelector: '.input__text',
  submitButtonSelector: '.input__submit-button'
}

export const addPopupSelectors = {
  popupSelector: '#addPopup',
  popupCloseBtnSelector: '.popup__close-button',
  openedPopupClass: 'popup_opened',
  formSelector: '.input',
  formInputSelector: '.input__text',
  submitButtonSelector: '.input__submit-button'
}

export const cardPopupSelectors = {
  popupSelector: '#cardPopup',
  popupCloseBtnSelector: '.popup__close-button',
  openedPopupClass: 'popup_opened',
  popupPhotoSelector: '.popup__image',
  popupCaptionSelector: '.popup__image-name'
}

export const deleteCardPopupSelectors = {
  popupSelector: '#deletePopup',
  popupCloseBtnSelector: '.popup__close-button',
  openedPopupClass: 'popup_opened',
  formSelector: '.input',
  submitButtonSelector: '.input__submit-button'
}

export const editAvatarPopupSelectors = {
  popupSelector: '#avatarPopup',
  popupCloseBtnSelector: '.popup__close-button',
  openedPopupClass: 'popup_opened',
  formSelector: '.input',
  formInputSelector: '.input__text',
  submitButtonSelector: '.input__submit-button'
}

export const cardSelectors = {
  templateSelector: '#cardTemplate',
  cardImageSelector: '.photo__image',
  cardNameSelector: '.photo__name',
  cardLikeBtnSelector: '.photo__like-button',
  cardDeleteBtnSelector: '.photo__delete-button',
  likeCountSelector: '.photo__like-count',
  cardLikeBtnActiveClass: 'photo__like-button_active'
}