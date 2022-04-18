import ArticleService from '@/services/article';

export default {
  state: {
    sliderArticle: [],
    cultureArticle: [],
  },
  reducers: {
    setSliderArticle(pre, now) {
      pre.sliderArticle = now;
    },
    setCultureArticle(pre, now) {
      pre.cultureArticle = now;
    },
  },
  effects: (dispatch) => ({
    async getSliderArticle() {
      const data = await ArticleService.getSliderArticle();
      dispatch.article.setSliderArticle(data.article);
      return data;
    },
    async getCultureArticle() {
      const data = await ArticleService.getCultureArticle();
      dispatch.article.setCultureArticle(data.article);
      return data;
    },
  }),
};

