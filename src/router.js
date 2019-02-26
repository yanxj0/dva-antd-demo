import React from 'react'
import { Route, routerRedux, Redirect, Switch, Router } from 'dva/router'
import dynamic from 'dva/dynamic'
import ProTypes from 'prop-types'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { routers } from '@configs/router.config'
import App from '@routes/base'
import NotFound from './routes/base/notfound'
import Login from './routes/base/login'
import AppBase from './routes/base/app'

export default function Routers({ history, app }) {
    return (
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <App root={app}>
                    <Switch>
                        {/* <Route path={'/login'} component={Login}/>
                        <Route exact path={'/'} component={AppBase}/>
                        <Route path={'*'} component={NotFound}/> */}
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
