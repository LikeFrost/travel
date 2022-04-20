import CommentService from '@/services/comment';

export default {
  state: {
    comment: [],
  },
  reducers: {
    setComment(pre, now) {
      pre.comment = now;
    },
  },
  effects: (dispatch) => ({
    async getComment() {
      const data = await CommentService.getComment();
      dispatch.comment.setComment(data.comment);
      return data;
    },
    async addComment(props) {
      return await CommentService.addComment(props);
    },
    async deleteComment(id) {
      return await CommentService.deleteComment(id);
    },
  }),
};
