export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc)
  document.addEventListener('click', closeByOverlayClick)
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEsc)
  document.removeEventListener('click', closeByOverlayClick)
}

function closeByEsc(evt) {
  if (evt.key == "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function closeByOverlayClick(evt) {
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}