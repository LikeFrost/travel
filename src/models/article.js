import ArticleService from '@/services/article';

export default {
  state: {
    sliderArticle: [],
    cultureArticle: [],
    travelArticle: [],
    activityArticle: [],
    informArticle: [],
    searchArticle: [],
  },
  reducers: {
    setSliderArticle(pre, now) {
      pre.sliderArticle = now;
    },
    setCultureArticle(pre, now) {
      pre.cultureArticle = now;
    },
    setTravelArticle(pre, now) {
      pre.travelArticle = now;
    },
    setActivityArticle(pre, now) {
      pre.activityArticle = now;
    },
    setInformArticle(pre, now) {
      pre.informArticle = now;
    },
    setSearchArticle(pre, now) {
      pre.searchArticle = now;
    },
  },
  effects: (dispatch) => ({
    async getSliderArticle() {
      const data = await ArticleService.getSliderArticle();
      dispatch.article.setSliderArticle(data.article);
    },
    async getCultureArticle() {
      const data = await ArticleService.getCultureArticle();
      dispatch.article.setCultureArticle(data.article);
    },
    async getTravelArticle() {
      const data = await ArticleService.getTravelArticle();
      dispatch.article.setTravelArticle(data.article);
    },
    async getActivityArticle() {
      const data = await ArticleService.getActivityArticle();
      dispatch.article.setActivityArticle(data.article);
    },
    async getInformArticle() {
      const data = await ArticleService.getInformArticle();
      dispatch.article.setInformArticle(data.article);
    },
    async getSearchArticle(search) {
      const data = await ArticleService.getSearchArticle(search);
      dispatch.article.setSearchArticle(data.article);
      return data.article;
    },
    async addArticle(props) {
      return await ArticleService.addArticle(props);
    },
    async deleteArticle(id) {
      return await ArticleService.deleteArticle(id);
    },
  }),
};

