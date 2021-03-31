initialCards.forEach((card) => {
  cardsContainer.append(getCard(card.name, card.link))
})

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
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
    cardPopupCloseBtn.addEventListener('click', (evt) => {
      closePopup(cardPopup)
    })
    openPopup(cardPopup)
  })

  return card
}

addPopupOpenBtn.addEventListener('click', () => {
  newCardName.value = ""
  newCardLink.value = ""
  openPopup(addPopup)
})
addPopupCloseBtn.addEventListener('click', () => closePopup(addPopup))
addPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  
  cardsContainer.prepend(getCard(newCardName.value, newCardLink.value))
  closePopup(addPopup)
})