import React from 'react'
import { Route, routerRedux, Redirect, Switch, Router } from 'dva/router'
import ProTypes from 'prop-types'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import * as base from '@routes/base'

const { ConnectedRouter } = routerRedux

export default function Routers({ history }) {
    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact key="app" path="/" component={base.app} />
                    <Route exact key="login" path="/login" component={base.login} />
                    <Route exact key="notfound" path="*" component={base.notfound} />
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    )
}

Routers.ProTypes = {
    history: ProTypes.object
}
