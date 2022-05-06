import BoardPresenter from './presenter/board-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const pageBody = document.querySelector('body');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const boardPresenter = new BoardPresenter(pageBody, filmsModel, commentsModel);

boardPresenter.init();

