import React from 'react'
import { Route, Switch, Router } from 'dva/router'
import dynamic from 'dva/dynamic'
import ProTypes from 'prop-types'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { routers } from '@configs/router.config'
import App from '@routes/base'

export default function Routers({ history, app }) {
    return (
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <App root={app}>
                    <Switch>
                        {routers.reduce(
                            (prev, { path, ...dynamics }, index) => {
                                dynamics.pid === '-1' &&
                                    prev.push(
                                        <Route
                                            exact={path==='/'}
                                            key={path}
                                            path={path}
                                            component={dynamic({
                                                app,
                                                ...dynamics
                                            })}
                                        />
                                    )
                                return prev
                            },
                            []
                        )}
                    </Switch>
                </App>
            </Router>
        </LocaleProvider>
    )
}

Routers.ProTypes = {
    history: ProTypes.object,
    app: ProTypes.object
}
