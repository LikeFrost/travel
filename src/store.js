import { createStore } from 'ice';
import img from './models/img';
import article from './models/article';
import user from './models/user';
import comment from './models/comment';

const store = createStore({
  img,
  article,
  user,
  comment,
});

export default store;
