import React from 'react'
import { Route, routerRedux, Redirect, Switch, Router } from 'dva/router'
import dynamic from 'dva/dynamic'
import ProTypes from 'prop-types'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { routers } from '@configs/router.config'
import { App } from '@routes/base'

export default function Routers({ history,app }) {
    return (
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <App>
                    <Switch>
                        {/* <Route exact key="app" path="/" component={base.app} />
                    <Route exact key="login" path="/login" component={base.login} />
                    <Route exact key="notfound" path="*" component={base.notfound} /> */
                        routers.map(({ path, ...dynamics }, index) => (
                            <Route
                                key={index}
                                path={path}
                                exact
                                component={dynamic({
                                    ...dynamics
                                })}
                            />
                        ))}
                    </Switch>
                </App>
            </Router>
        </LocaleProvider>
    )
}

Routers.ProTypes = {
    history: ProTypes.object
}