export default class Card {
  /**
   * Класс Card соответствует карточке с изображением и подписью, кнопками лайка и удаления.
   * @param {*} cardSelectors - объект, содержащий необходимые селекторы
   * @param {*} name - подпись изображения
   * @param {*} imageLink - ссылка на изображение (URL)
   * @param {*} handleCardClick - колбэк функция при нажатии на карточку
   */
  constructor({templateSelector, cardImageSelector, cardNameSelector, cardLikeBtnSelector, cardDeleteBtnSelector, likeCountSelector, cardLikeBtnActiveClass}, {name, link, likes, owner, _id}, handleCardClick, handleLikeClick, handleDeleteClick, currentUserId) {
    this.name = name;
    this.image = link;
    this.isLiked = false;
    this._likes = likes;
    this.likesCount = likes.length;
    this.ownerId = owner._id;
    this.id = _id;

    this._currentUserId = currentUserId;

    this._element = this._getTemplateBySelector(templateSelector);
    this._cardImage = this._element.querySelector(cardImageSelector);
    this._cardName = this._element.querySelector(cardNameSelector);
    this._likeBtn = this._element.querySelector(cardLikeBtnSelector);
    this._deleteBtn = this._element.querySelector(cardDeleteBtnSelector);
    this._likeCount = this._element.querySelector(likeCountSelector);

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardLikeBtnActiveClass = cardLikeBtnActiveClass;
  }

  _getTemplateBySelector(templateSelector) {
    return document
    .querySelector(templateSelector)
    .content
    .children[0]
    .cloneNode(true);
  }

  /**
   * 
   * @returns Возвращает готовый объект Card
   */
  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this.image;
    this._cardImage.alt = this.name;

    this._cardName.textContent = this.name;
    this.updateLikesCount();

    // Скрываем/показываем кнопку удаления карточки
    if (this.ownerId != this._currentUserId) {
      this._hideDeleteCardBtn();
    }

    // Переключаем кнопку лайка
    // Проверяем всех пользователей, лайкнувших эту карточку.
    // Если среди них есть я, то переключаем кнопку лайка.
    this._likes.some(userData => {
      if (userData._id === this._currentUserId) {
        this.toggleLike();
        // Выходим из цикла
        return true;
      }
    })

    return this._element;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this.toggleLike();
      this._handleLikeClick();
    })

    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteClick();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  /**
   * Переключает лайк с карточки
   */
  toggleLike() {
    this.isLiked = !this.isLiked;
    this._likeBtn.classList.toggle(this._cardLikeBtnActiveClass);
    this._likeBtn.blur(); //Removes focus on element after click
  }

  /**
   * Удаляет карточку
   */
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  /**
   * Скрывает кнопку удаления карточки
   */
  _hideDeleteCardBtn() {
    this._deleteBtn.classList.add('photo__delete-button_hiden');
  }

  /**
   * Обновляет количество лайков
   */
  updateLikesCount() {
    this._likeCount.textContent = this.likesCount;
  }
}