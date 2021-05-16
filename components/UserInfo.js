export default class UserInfo {
  /**
   * Класс UserInfo отвечает за управление отображением информации о пользователе на странице
   * @param {*} userInfoContainerSelector - селектор контейнера с информацией о пользователе
   * @param {*} userNameSelector - селектор элемента с именем пользователя
   * @param {*} userCaptionSelector - селектор элемента с подписью пользователя
   */
  constructor({userInfoContainerSelector, userNameSelector, userCaptionSelector}) {
    this._userInfoContainer = document.querySelector(userInfoContainerSelector);
    this._userNameElement = this._userInfoContainer.querySelector(userNameSelector);
    this._userName = this._userNameElement.textContent;
    this._userCaptionElement = this._userInfoContainer.querySelector(userCaptionSelector);
    this._userCaption = this._userCaptionElement.textContent;
  }

  /**
   * 
   * @returns Возвращает объект, содержащий имя пользователя name и подпись caption
   */
  getUserInfo() {
    return {
      name: this._userName,
      caption: this._userCaption
    }
  }

  /**
   * Принимает новые данные пользователя и добавляет их на страницу
   * @param {*} name - имя пользователя
   * @param {*} caption - подпись пользователя
   */
  setUserInfo(name, caption) {
    this._userName = name;
    this._userCaption = caption;

    this._userNameElement.textContent = this._userName;
    this._userCaptionElement.textContent = this._userCaption;
  }
}