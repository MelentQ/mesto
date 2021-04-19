initialCards.forEach((card) => {
  cardsContainer.append(getCard(card.name, card.link))
})

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc)
  document.addEventListener('click', closeByOverlayClick)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEsc)
  document.removeEventListener('click', closeByOverlayClick)
}

function saveChanges(evt) {
  evt.preventDefault()
  currentProfileName.textContent = newProfileName.value;
  currentProfileActivity.textContent = newProfileActivity.value;
  closePopup(editPopup)
}

editPopupOpenBtn.addEventListener('click', () => {
  newProfileName.value = currentProfileName.textContent;
  newProfileActivity.value = currentProfileActivity.textContent;
  openPopup(editPopup)
})
editPopupCloseBtn.addEventListener('click', () => closePopup(editPopup))
editPopupForm.addEventListener('submit', saveChanges)

function getCard(name, link) {
  const card = cardTemplate.querySelector('.photo').cloneNode(true)
  const cardImage = card.querySelector('.photo__image')
  const likeButton = card.querySelector('.photo__like-button')
  const deleteButton = card.querySelector('.photo__delete-button')

  cardImage.src = link
  cardImage.alt = name
  card.querySelector('.photo__name').textContent = name

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo__like-button_active')
    evt.target.blur() //Removes focus on element after click
  })

  deleteButton.addEventListener('click', (evt) => {
    card.remove()
  })

  cardImage.addEventListener('click', (evt) => {
    cardPopupImage.src = link
    cardPopupImage.alt = name
    cardPopupCaption.textContent = name
    openPopup(cardPopup)
  })

  return card
}

cardPopupCloseBtn.addEventListener('click', (evt) => {
  closePopup(cardPopup)
})

addPopupOpenBtn.addEventListener('click', () => {
  addPopupForm.reset()
  openPopup(addPopup)
})
addPopupCloseBtn.addEventListener('click', () => closePopup(addPopup))
addPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  
  cardsContainer.prepend(getCard(newCardName.value, newCardLink.value))
  closePopup(addPopup)
})


function closeByEsc(evt) {
  if (evt.key == "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function closeByOverlayClick(evt) {
  const openedPopup = document.querySelector('.popup_opened')
  
  //Клик по попапу закрывает его
  openedPopup.addEventListener('click', evt => {
    closePopup(openedPopup)
  })

  //Но отключим всплытие события, если кликнуть на сам попап

  //Для двух попапов редактирования профиля
  const popupEditProfile = openedPopup.querySelector('.popup__container');
  //Если не null
  if (popupEditProfile) {
    popupEditProfile.addEventListener('click', evt => {
      evt.stopImmediatePropagation()
    })
  }

  //Для попапа с изображением
  const popupPhoto = openedPopup.querySelector('.popup__image-container');
  //Если не null
  if (popupPhoto) {
    popupPhoto.addEventListener('click', evt => {
      evt.stopImmediatePropagation()
    })
  }
}

EnableValidation({
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit-button',
  inactiveButtonClass: 'input__submit-button_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: 'form__input-error_active'
});