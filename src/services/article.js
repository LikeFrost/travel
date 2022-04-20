import { request } from 'ice';

export default {
  async getSliderArticle() {
    return await request.get(
      '/article/slider',
    );
  },
  async getCultureArticle() {
    return await request.get(
      '/article/culture',
    );
  },
  async getTravelArticle() {
    return await request.get(
      '/article/travel',
    );
  },
  async getActivityArticle() {
    return await request.get(
      '/article/activity',
    );
  },
  async getInformArticle() {
    return await request.get(
      '/article/inform',
    );
  },
  async getSearchArticle(search) {
    return await request.get(
        `/article/search/${search}`,
    );
  },
  async addArticle(props) {
    const formData = new FormData();
    formData.append('img', props.img || '');
    formData.append('articleType', props.articleType || '');
    formData.append('title', props.title || '');
    formData.append('text', props.text || '');
    formData.append('location', props.location || '');
    formData.append('time', props.time || '');
    return await request.post(
      '/article',
      formData,
      {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data, headers) => {
          return formData;
        },
      },
    );
  },
  async deleteArticle(id) {
    return await request.delete(
        `/article/${id}`,
        { headers: {
          Authorization: sessionStorage.getItem('token'),
        } },
    );
  },
};
