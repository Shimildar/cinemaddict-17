import BoardPresenter from './presenter/board-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const pageBody = document.querySelector('body');
const boardPresenter = new BoardPresenter();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

boardPresenter.init(pageBody, filmsModel, commentsModel);

