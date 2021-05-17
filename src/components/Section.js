export default class Section {
  /**
   * Класс Section отвечает за отрисовку элементов на странице
   * @param {*} param0 - объект с двумя свойствами: items и renderer. Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. Свойство renderer — это функция с параметром item, которая отвечает за создание и отрисовку данных на странице.
   * @param {*} containerSelector - селектор контейнера
   */
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Отрисовывает все элементы items
   */
  renderItems() {
    this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  /**
   * Добавляет DOM-элемент item в контейнер
   * @param {*} item - DOM-элемент
   */
  addItem(item) {
    this._container.prepend(item);
  }

  /**
   * Очищает контейнер
   */
  clear() {
    this._container.innerHTML = '';
  }
}