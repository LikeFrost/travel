import UserService from '@/services/user';

export default {
  state: {},
  reducers: {},
  effects: () => ({
    async login(props) {
      const data = await UserService.login(props);
      sessionStorage.setItem('token', data.token);
      return data;
    },
    async logUp(props) {
      const data = await UserService.logUp(props);
      sessionStorage.setItem('token', data.token);
      return data;
    },
  }),
};

