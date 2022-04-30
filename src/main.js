import {render} from './render.js';
import UserProfileView from './view/user-profile-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import {FilmsModel, CommentsModel} from './model/films-model.js';

const pageBody = document.querySelector('body');
const siteHeaderElement = pageBody.querySelector('.header');
const siteMainElement = pageBody.querySelector('.main');
const footerStatistics = pageBody.querySelector('.footer__statistics');
const boardPresentor = new BoardPresenter();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

render(new UserProfileView(), siteHeaderElement);
render(new FooterStatisticsView(), footerStatistics);

boardPresentor.init(siteMainElement, filmsModel, commentsModel);

