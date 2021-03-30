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
// Adding initial cards
initialCards.forEach((item) => {
  cardsContainer.append(getCard(item.name, item.link))
})

// Edit button
const editPopup = document.querySelector('#editPopup')
const editPopupOpenBtn = document.querySelector('.profile__button_type_edit')
const editPopupCloseBtn = editPopup.querySelector('.popup__close-button')
const editPopupForm = editPopup.querySelector('.input')

const currentProfileName = document.querySelector('.profile__name')
const currentProfileActivity = document.querySelector('.profile__activity')
const newProfileName = editPopupForm.querySelector('.input__text_type_name')
const newProfileActivity = editPopupForm.querySelector('.input__text_type_activity')

function openPopup(object) {
  object.classList.add('popup_opened')
}

function closePopup(object) {
  object.classList.remove('popup_opened')
}

// Saves changes from edit popup
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

// Add button
const addPopup = document.querySelector('#addPopup')
const addPopupOpenBtn = document.querySelector('.profile__button_type_add')
const addPopupCloseBtn = addPopup.querySelector('.popup__close-button')
const addPopupForm = addPopup.querySelector('.input')

const cardPopup = document.querySelector('#cardPopup')
const cardPopupImage = cardPopup.querySelector('.popup__image')
const cardPopupCaption = cardPopup.querySelector('.popup__image-name')
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close-button')

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
      cardPopup.classList.remove('popup_opened')
    })
    cardPopup.classList.add('popup_opened')
  })

  return card
}

addPopupOpenBtn.addEventListener('click', () => openPopup(addPopup))
addPopupCloseBtn.addEventListener('click', () => closePopup(addPopup))
addPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const cardName = addPopupForm.querySelector('.input__text_type_name').value
  const cardLink = addPopupForm.querySelector('.input__text_type_link').value
  
  cardsContainer.append(getCard(cardName, cardLink))
  closePopup(addPopup)
})