import { request } from 'ice';

export default {
  async getComment() {
    return await request.get(
      '/comment',
    );
  },
  async addComment(props) {
    return await request.post(
      '/comment',
      { text: props.text, time: props.time },
      { headers: {
        Authorization: sessionStorage.getItem('token'),
      } },
    );
  },
  async deleteComment(id) {
    return await request.delete(
        `/comment/${id}`,
        { headers: {
          Authorization: sessionStorage.getItem('token'),
        } },
    );
  },
};
