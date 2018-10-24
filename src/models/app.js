import { routerRedux } from 'dva/router'

let checkLogin = false;

export default {
    namespace: 'app',
    state: {
        menusCollapsed: false,
    },
    reducers: {
        toggleMenus(state, payload){
            return { ...state, menusCollapsed: !state.menusCollapsed }
        }
    },
    effects: {
        
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/' && !checkLogin) {
                    checkLogin = true;
                    dispatch({ type: 'login/checkLogin' })
                }
            })
        }
    }
}
