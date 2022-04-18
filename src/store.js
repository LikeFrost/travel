import { createStore } from 'ice';
import img from './models/img';
import article from './models/article';

const store = createStore({
  img,
  article,
});

export default store;
