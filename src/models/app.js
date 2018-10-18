import { routerRedux } from 'dva/router'

let checkLogin = false;

export default {
    namespace: 'app',
    state: {
        
    },
    reducers: {
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
