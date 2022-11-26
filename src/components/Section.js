export class Section {
  constructor({ items, renderer }, cardsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  renderItems() {
    console.log(this._items);
    if (Array.isArray(this._items)) {
      const reversedItems = this._items.reverse();
      reversedItems.forEach((item) => this._renderer(item));
    } else {
      this._renderer(this._items);
    }
  }

  setItem(item) {
    this._container.prepend(item);
  }
}
