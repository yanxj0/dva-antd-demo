import { routerRedux } from 'dva/router'

let checkLogin = false;

export default {
    namespace: 'app',
    state: {
        menusCollapsed: true,
        locationPath: null,
    },
    reducers: {
        toggleMenus(state, payload){
            return { ...state, menusCollapsed: !state.menusCollapsed }
        },
        updateStore (state, { payload }) {
            return {...state, ...payload}
        },
    },
    effects: {
        * updateLocation ({
            payload
        }, {put, select}) {
            yield put({type: 'updateStore', payload});
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/' && !checkLogin) {
                    checkLogin = true;
                    dispatch({ type: 'login/checkLogin' })
                }
            })
        },
        setupHistory({ dispatch, history }){
            history.listen((location) => {
                dispatch({
                    type: 'updateLocation',
                    payload: {
                      locationPath: location.pathname
                    },
                });
            })
        }
    }
}
