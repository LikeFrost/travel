import { request } from 'ice';

export default {
  async getSliderImg() {
    return await request.get(
      '/img/slider',
    );
  },
};
