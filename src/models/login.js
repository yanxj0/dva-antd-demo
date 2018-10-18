import { loginApi } from '@services/common'
import { routerRedux } from 'dva/router'

export default {
    namespace: 'login',
    state: {
        isLogin: false
    },
    reducers: {
        login(state, { data }) {
            return { ...state, isLogin: data.success }
        }
    },
    effects: {
        *checkLogin({ payload }, { put, call, select }) {
            const isLogin = yield select(state=>state.login.isLogin)
            if (!isLogin && !payload) {
                yield put(routerRedux.push('/login'))
            } else {
                const data = yield call(loginApi, payload)
                if (data.status === 1) {
                    yield put(routerRedux.push('/'))
                }
                yield put({ type: 'login', data: data })
            }
        }
    },
    subscriptions: {
      
    }
}
