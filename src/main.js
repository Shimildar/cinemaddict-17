import {render} from './render.js';
import UserProfileView from './view/user-profile-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import PopupView from './view/popup-view.js';

const pageBody = document.querySelector('body');
const siteHeaderElement = pageBody.querySelector('.header');
const siteMainElement = pageBody.querySelector('.main');
const footerStatistics = pageBody.querySelector('.footer__statistics');
const boardPresentor = new BoardPresenter();

render(new UserProfileView(), siteHeaderElement);
render(new FooterStatisticsView(), footerStatistics);
render(new PopupView(), pageBody);

boardPresentor.init(siteMainElement);

