import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class CommentsApiService extends ApiService {

  getComments = (film) => this._load({url: `comments/${film.id}`})
    .then(ApiService.parseResponse);

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  deleteComment = async (commentId) => {
    await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  };
}
