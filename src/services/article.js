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
};
