class Section{
  constructor({data, renderer}, selector){
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(`${selector}`);
  }

  renderItems(){
    this.data.forEach((item) => this.renderer(item));
  }

  setItem(item){
    this._container.append(item);
  }
}
