import {
  initialCards,
  validationSelectors,
  nameAttribute,
  userInfoSelectors,
  formSelectors,
  popupSelectors,
  openedPopupClass,
  cardTemplateSelector,
  cardContainerSelector,
  editPopupOpenButtonSelector,
  addPopupOpenButtonSelector,
  cardSelectors,
  cardLikeBtnActiveClass
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// <<<<<<<<<<
// Колбэк функция открытия попапа с картинкой при клике на карточку
function handleCardClick() {
  const popupWithImage = new PopupWithImage(
    popupSelectors.cardPopup,
    popupSelectors.popupCloseBtn,
    openedPopupClass,
    popupSelectors.popupImage,
    this.image, // это ок?
    popupSelectors.popupImageCaption,
    this.name
  );
  popupWithImage.setEventListeners();

  popupWithImage.open();
}
// >>>>>>>>>>



// <<<<<<<<<<
// Колбэк функция отрисовки карточек "из коробки"
function initialCardsRenderer(item) {
  const card = new Card(
    item.name,
    item.link,
    cardTemplateSelector,
    handleCardClick,
    cardSelectors,
    cardLikeBtnActiveClass
  );
  this.addItem(card.generateCard());
}
// >>>>>>>>>>



// <<<<<<<<<<
// Колбэк функция сабмита формы редактирования профиля
function submitEditPopup(evt) {
  evt.preventDefault();

  const {name, activity} = editPopup.getInputValues();
  userInfo.setUserInfo(name, activity);

  this.close();
}
// >>>>>>>>>>



// <<<<<<<<<<
// Колбэк функция сабмита формы добавления карточки
function submitAddPopup(evt) {
  evt.preventDefault();

  // Создание карточки
  const card = new Card(
    addPopupForm[nameAttribute.cardName].value,
    addPopupForm[nameAttribute.cardLink].value,
    cardTemplateSelector,
    handleCardClick,
    cardSelectors,
    cardLikeBtnActiveClass
  );

  // Добавление в секцию
  cardList.addItem(card.generateCard());

  this.close();
}
// >>>>>>>>>>



// <<<<<<<<<<
// Загрузка карточек из коробки
const cardList = new Section(
  {
    items: initialCards,
    renderer: initialCardsRenderer
  },
  cardContainerSelector
);

cardList.renderItems();
// >>>>>>>>>>



// <<<<<<<<<<
// Информации о пользователе,
// попап редактирования профиля
const userInfo = new UserInfo(userInfoSelectors);

const editPopup = new PopupWithForm(
  popupSelectors.editPopup,
  popupSelectors.popupCloseBtn,
  openedPopupClass,
  submitEditPopup,
  formSelectors
);
editPopup.setEventListeners();

// Включение валидации формы
const editPopupForm = document.forms[nameAttribute.editForm];
const editPopupFormValidator = new FormValidator(validationSelectors, editPopupForm);
editPopupFormValidator.enableValidation();

// Открытие попапа на клик по кнопке
const editPopupOpenBtn = document.querySelector(editPopupOpenButtonSelector);
editPopupOpenBtn.addEventListener('click', () => {
  // Добавим в поля формы текущие значения
  // Наверное есть более короткая и красивая запись:
  const user = userInfo.getUserInfo();
  editPopupForm[nameAttribute.userName].value = user.name;
  editPopupForm[nameAttribute.userCaption].value = user.caption;
  // Проверим валидность полей ввода
  editPopupFormValidator.inputList.forEach(inputElement => {
    editPopupFormValidator.checkInputValidity(inputElement);
  });
  // Включим или отключим кнопку сабмита
  editPopupFormValidator.toggleButtonState();

  editPopup.open();
})
// >>>>>>>>>>



// <<<<<<<<<<
// Попап добавления карточки
// Валидация формы
const addPopupForm = document.forms[nameAttribute.addForm];
const addPopupFormValidator = new FormValidator(validationSelectors, addPopupForm);
addPopupFormValidator.enableValidation();

const addPopup = new PopupWithForm(
  popupSelectors.addPopup,
  popupSelectors.popupCloseBtn,
  openedPopupClass,
  submitAddPopup,
  formSelectors
)
addPopup.setEventListeners();

// Открытие попапа на клик по кнопке
const addPopupOpenBtn = document.querySelector(addPopupOpenButtonSelector);
addPopupOpenBtn.addEventListener('click', () => {
  //Скроем сообщение об ошибке
  addPopupFormValidator.inputList.forEach(inputElement => {
    addPopupFormValidator.hideInputError(inputElement);
  })
  //Отключим кнопку добавления карточки при открытии попапа
  addPopupFormValidator.disableSubmitButton();

  addPopup.open();
})
// >>>>>>>>>>