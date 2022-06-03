import AbstractView from '../framework/view/abstract-view.js';

const createFooter = (count) => `<p>${count} movies inside</p>`;

export default class FooterView extends AbstractView {

  constructor(count) {
    super();
    this.count = count;
  }

  get template() {
    return createFooter(this.count);
  }
}
