import React from 'react'
import { Router, Route, routerRedux, Redirect, Switch, NotFoundRoute } from 'dva/router'

import * as base from '@routes/base'

const { ConnectedRouter } = routerRedux

export default (history) => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact key="app" path="/" component={base.app} />
            <Route key="login" path="/login" component={base.login} />
            <Route key="notfound" path="*" component={base.notfound} />
        </Switch>
    </ConnectedRouter>
)