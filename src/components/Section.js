export class Section {
  constructor({ items, renderer }, cardsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  renderItems(items) {
    if (Array.isArray(items)) {
      const reversedItems = items.reverse();
      reversedItems.forEach((item) => this._renderer(item));
    } else {
      this._renderer(items);
    }
  }

  setItem(item) {
    this._container.prepend(item);
  }
}
