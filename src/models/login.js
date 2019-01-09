import { loginApi } from '@services/common'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

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
            else{
                message.error('用户名或密码错误', 1000 )
            }
        }
    },
    subscriptions: {

    }
}
