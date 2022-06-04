import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import UserProfileView from './view/user-profile-view.js';
import FooterView from './view/footer-view.js';
import { render } from './framework/render.js';

const pageBody = document.querySelector('body');
const siteHeaderElement = pageBody.querySelector('.header');
const siteMainElement = pageBody.querySelector('.main');
const siteFooterElement = pageBody.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMainElement, filmsModel, filterModel);
const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, commentsModel, filterModel);

render(new UserProfileView(filmsModel.films), siteHeaderElement);
render(new FooterView(filmsModel.films.length), siteFooterElement);

filterPresenter.init();
boardPresenter.init();

