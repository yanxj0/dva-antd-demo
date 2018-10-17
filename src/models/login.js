import { loginApi } from '@services/common'

export default {
  namespace: "login",
  state: [],
  reducers: {
    'login'(state, { data: id }) {
      return state.filter(item => item.id !== id);
    }
  },
  effects: {
    *checkLogin(action, { put, call }) {
      const users = yield call(loginApi, action.data);
      yield put({ type: "login", data: users });
    }
  },
  subscriptions: {
    /* setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/user") {
          dispatch({ type: "fetch" });
        }
      });
    } */
  }
};
