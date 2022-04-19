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
};
