export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(`${selector}`);
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
