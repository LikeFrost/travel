import ImgService from '@/services/img';

export default {
  state: {
    img: [],
  },
  reducers: {
    setImg(pre, now) {
      pre.img = now;
    },
  },
  effects: (dispatch) => ({
    async getSliderImg() {
      const data = await ImgService.getSliderImg();
      dispatch.img.setImg(data.img);
      return data;
    },
  }),
};

