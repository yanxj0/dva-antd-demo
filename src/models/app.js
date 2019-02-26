import { routerRedux } from 'dva/router'
import { menus } from '@configs/router.config'

export default {
    namespace: 'app',
    state: {
        root: null,
        menusCollapsed: false,
        menus: menus,
        token: null,
        locationPath: null
    },
    reducers: {
        updateStore(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * setRootInstance({ payload }, {put}){
            yield put({ type: 'updateStore', payload })
        },
        * updateLocation({ payload }, { put, select }) {
            yield put({ type: 'updateStore', payload })
        },
        * updateToken({ payload }, { put, select }) {
            yield put({ type: 'updateStore', payload})
        },
        * toggleMenus({ payload }, { put, select }) {
            yield put({ type: 'updateStore', payload})
        },
        * logout({ payload }, { put, select }) {
            window.sessionStorage.removeItem('token');
            yield put(routerRedux.push('/login'))
        },
        * loginOK({ payload }, { put, select }) {
            window.sessionStorage.setItem('token',payload.token);
            yield put(routerRedux.push('/base'))
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {

        },
        setupHistory({ dispatch, history }) {
            history.listen(location => {
                dispatch({
                    type: 'updateLocation',
                    payload: {
                        locationPath: location.pathname
                    }
                });
                dispatch({
                    type: 'updateToken',
                    payload: {
                      token: window.sessionStorage.getItem('token')
                    },
                })
            })
        }
    }
}
