import './index.css';

import {
  apiAddress,
  apiToken,
  validationSelectors,
  nameAttribute,
  userInfoSelectors,
  cardContainerSelector,
  editPopupOpenButtonSelector,
  addPopupOpenButtonSelector,
  editAvatarButtonSelector,
  editPopupSelectors,
  addPopupSelectors,
  cardPopupSelectors,
  deleteCardPopupSelectors,
  editAvatarPopupSelectors,
  cardSelectors
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

/**
 * Создает карточку
 * @param {*} data объект с данными карточки {...}
 * @returns Возвращает готовую разметку
 */
 function createCard(data) {
  const card = new Card(
    cardSelectors,
    data,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userInfo.getUserInfo().id
  );

  return card.generateCard();
}

// Колбэк функция обновления аватара
function submitAvatarPopup() {
  const link = editAvatarPopupForm[nameAttribute.avatarLink].value;

  editAvatarPopup.waitingMode(true, 'Сохранение...');
  api.setUserAvatar(link)
    .then(userData => {
      userInfo.setUserAvatar(userData.avatar);

      this.close();
    })
    .catch(err => console.log(`Ошибка при обновлении аватара: ${err.status}`))
    .finally(() => editAvatarPopup.waitingMode(false))
}

// Колбэк функция открытия попапа с картинкой при клике на карточку
function handleCardClick() {
  popupWithImage.open(this.name, this.image);
}

// Колбэк функция отрисовки карточек "из коробки"
function initialCardsRenderer(item) {
  const card = createCard(item);

  this.appendItem(card);
}

// Колбэк функция сабмита формы редактирования профиля
function submitEditPopup(evt) {
  evt.preventDefault();

  const {name, activity} = editPopup.getInputValues();

  //Загрузим данные на сервер
  editPopup.waitingMode(true, 'Сохранение...');
  api.setProfileInfo(name, activity)
    .then(res => {
      // Отобразим изменения на сервере
      userInfo.setUserInfo(res.name, res.about);

      this.close();
    })
    .catch(err => console.log(`Ошибка при обновлении данных о пользователе: ${err.status}`))
    .finally(() => editPopup.waitingMode(false))
}

// Колбэк функция сабмита формы добавления карточки
function submitAddPopup(evt) {
  evt.preventDefault();

  addPopup.waitingMode(true, 'Создание...');
  // Добавляем карточку на сервер
  api.addCard(addPopupForm[nameAttribute.cardName].value, addPopupForm[nameAttribute.cardLink].value)
    .then(cardData => {
      const card = createCard(cardData);
      // Добавление в секцию
      cardList.prependItem(card);

      this.close();
    })
    .catch(err => console.log(`Ошибка при создании новой карточки: ${err.status}`))
    .finally(() => addPopup.waitingMode(false))
}

// Колбэк функция нажатия по кнопке лайка
function handleLikeClick() {
  // Если карточка лайкнута -> отправь лайк на сервер
  // Иначе -> удали лайк на сервере
  if (this.isLiked) {
    api.likeCard(this.id)
      .then(cardData => {
        this.likesCount = cardData.likes.length;
        this.updateLikesCount();
      })
      .catch(err => console.log(`Ошибка при лайке карточки: ${err.status}`))
  }
  else {
    api.removeLikeFromCard(this.id)
      .then(cardData => {
        this.likesCount = cardData.likes.length;
        this.updateLikesCount();
      })
      .catch(err => console.log(`Ошибка при лайке карточки: ${err.status}`))
  }
}

// Колбэк функция нажатия по кнопке удаления карточки
function handleDeleteClick() {
  deleteCardPopup.setSubmitAction((evt) => {
    // Удаляем карточку, по которой кликнули
    // Она хранится в this
    deleteCardPopup.waitingMode(true, 'Удаление...');
    api.deleteCard(this.id)
      .then(() => {
        // Теперь удаляем на клиенте
        this.deleteCard();

        // Закрываем попап
        deleteCardPopup.close();
      })
      .catch(err => console.log(`Ошибка при попытке удалить карточку: ${err.status}`))
      .finally(() => deleteCardPopup.waitingMode(false))
  })
  deleteCardPopup.open();
}

// API
const handleResponse = (res) => res.ok ? res.json() : Promise.reject(res.status);
const api = new Api(apiAddress, apiToken, handleResponse);

// Экземпляр класса для управления данными пользователя
const userInfo = new UserInfo(userInfoSelectors);

// Создаем секцию для отображения карточек
// Это будуший экземпляр класса Section
let cardList;

// Попап для изменения данных пользователя
const editPopup = new PopupWithForm(editPopupSelectors, submitEditPopup);
editPopup.setEventListeners();
// Валидация формы
const editPopupForm = document.forms[nameAttribute.editForm];
const editPopupFormValidator = new FormValidator(validationSelectors, editPopupForm);
editPopupFormValidator.enableValidation();
// Открытие попапа редактирования профиля на клик по кнопке
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
const addPopup = new PopupWithForm(addPopupSelectors, submitAddPopup);
addPopup.setEventListeners();
// Валидация формы
const addPopupForm = document.forms[nameAttribute.addForm];
const addPopupFormValidator = new FormValidator(validationSelectors, addPopupForm);
addPopupFormValidator.enableValidation();
// Открытие попапа добавления карточки на клик по кнопке
const addPopupOpenBtn = document.querySelector(addPopupOpenButtonSelector);
addPopupOpenBtn.addEventListener('click', () => {
  //Скроем сообщение об ошибке
  addPopupFormValidator.resetInputsError();
  //Отключим кнопку добавления карточки при открытии попапа
  addPopupFormValidator.disableSubmitButton();

  addPopup.open();
})

// Попап редактирования аватарки
const editAvatarPopup = new PopupWithForm(editAvatarPopupSelectors, submitAvatarPopup);
editAvatarPopup.setEventListeners();
// Валидация
const editAvatarPopupForm = document.forms[nameAttribute.avatarForm];
const editAvatarPopupFormValidator = new FormValidator(validationSelectors, editAvatarPopupForm);
editAvatarPopupFormValidator.enableValidation();
// Открытие попапа изменения аватарки на клик по кнопке
const editAvatarBtn = document.querySelector(editAvatarButtonSelector);
editAvatarBtn.addEventListener('click', () => {
  //Скроем сообщение об ошибке
  editAvatarPopupFormValidator.resetInputsError();
  //Отключим кнопку добавления карточки при открытии попапа
  editAvatarPopupFormValidator.disableSubmitButton();

  editAvatarPopup.open();
})

// Попап удаления карточки
const deleteCardPopup = new PopupWithSubmit(deleteCardPopupSelectors);
deleteCardPopup.setEventListeners();

// Попап с изображением
const popupWithImage = new PopupWithImage(cardPopupSelectors);
popupWithImage.setEventListeners();

// Получение данных о пользователе с сервера
// Получение начальных карточек с сервера
Promise.all([api.getUserData(), api.getCards()])
  .then(([data, cards]) => {
    // Получаем данные о пользователе
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
    userInfo.setUserId(data._id);

    // Создаем экземпляр класса Section,
    // закидываем в его конструктор полученные карточки
    cardList = new Section(
      {
        items: cards,
        renderer: initialCardsRenderer
      },
      cardContainerSelector
    );
    cardList.renderItems();
  })
  .catch(err => console.log(`Ошибка при загрузке данных с сервера: ${err.status}`))