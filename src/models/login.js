import { loginApi } from '@services/common'
import { routerRedux } from 'dva/router'

export default {
    namespace: 'login',
    state: {

    },
    reducers: {
        
    },
    effects: {
        *checkLogin({ payload }, { put, call, select }) {
            const { status, data } = yield call(loginApi, payload)
            if (status === 1) {
                yield put({ type: 'app/updateToken', payload: { token: data.token } })
            }
        }
    },
    subscriptions: {

    }
}
