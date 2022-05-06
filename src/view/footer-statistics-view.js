import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatistics = (count) => `<p>${count} movies inside</p>`;

export default class FooterStatisticsView extends AbstractView {

  constructor(count) {
    super();
    this.count = count;
  }

  get template() {
    return createFooterStatistics(this.count);
  }
}
