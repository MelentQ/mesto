import './index.css';

import {
  initialCards,
  validationSelectors,
  nameAttribute,
  userInfoSelectors,
  cardContainerSelector,
  editPopupOpenButtonSelector,
  addPopupOpenButtonSelector,
  editPopupSelectors,
  addPopupSelectors,
  cardPopupSelectors,
  cardSelectors
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

function createCard(name, link) {
  const card = new Card(
    cardSelectors,
    name,
    link,
    handleCardClick
  );

  return card.generateCard();
}

// Создание попапа с изображением
const popupWithImage = new PopupWithImage(cardPopupSelectors);
popupWithImage.setEventListeners();

// Колбэк функция открытия попапа с картинкой при клике на карточку
function handleCardClick() {
  popupWithImage.open(this.name, this.image);
}

// Колбэк функция отрисовки карточек "из коробки"
function initialCardsRenderer(item) {
  const card = createCard(item.name, item.link)
  this.addItem(card);
}

// Колбэк функция сабмита формы редактирования профиля
function submitEditPopup(evt) {
  evt.preventDefault();

  const {name, activity} = editPopup.getInputValues();
  userInfo.setUserInfo(name, activity);

  this.close();
}

// Колбэк функция сабмита формы добавления карточки
function submitAddPopup(evt) {
  evt.preventDefault();

  const card = createCard(addPopupForm[nameAttribute.cardName].value, addPopupForm[nameAttribute.cardLink].value)
  // Добавление в секцию
  cardList.addItem(card);

  this.close();
}

// Загрузка карточек из коробки
const cardList = new Section(
  {
    items: initialCards,
    renderer: initialCardsRenderer
  },
  cardContainerSelector
);

cardList.renderItems();

// Информации о пользователе,
// попап редактирования профиля
const userInfo = new UserInfo(userInfoSelectors);

const editPopup = new PopupWithForm(editPopupSelectors, submitEditPopup);
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
  // Сбросим ошибки с полей ввода
  editPopupFormValidator.resetInputsError();
  // Включим кнопку сабмита
  editPopupFormValidator.enableSubmitButton();

  editPopup.open();
})

// Попап добавления карточки
// Валидация формы
const addPopupForm = document.forms[nameAttribute.addForm];
const addPopupFormValidator = new FormValidator(validationSelectors, addPopupForm);
addPopupFormValidator.enableValidation();

const addPopup = new PopupWithForm(addPopupSelectors, submitAddPopup);
addPopup.setEventListeners();

// Открытие попапа на клик по кнопке
const addPopupOpenBtn = document.querySelector(addPopupOpenButtonSelector);
addPopupOpenBtn.addEventListener('click', () => {
  //Скроем сообщение об ошибке
  addPopupFormValidator.resetInputsError();
  //Отключим кнопку добавления карточки при открытии попапа
  addPopupFormValidator.disableSubmitButton();

  addPopup.open();
})