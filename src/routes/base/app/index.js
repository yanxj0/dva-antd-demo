import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from 'antd'
import pathToRegexp from 'path-to-regexp'
import './index.less'
import Header from './header'
import RouterBar from './routerBar'
import SiderMenus from './siderMenus'
import { routers } from '@configs/router.config'
import { Route, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'

const { Footer, Content, Sider } = Layout

const AppBase = ({ root, dispatch, menus, path, menusCollapsed }) => {
    function onCollapse() {
        dispatch({
            type: 'app/toggleMenus',
            payload: {
                menusCollapsed: !menusCollapsed
            }
        })
    }
    function logout() {
        dispatch({
            type: 'app/logout'
        })
    }

    const byId = menus.byId
    let loginPath = null,
        isLoginPage = null,
        menusProps = null,
        barProps = null,
        curMenu = null,
        showOrHide = ''
    //404
    const found = [...byId.values()].some(item => {
        if (item.path === path) {
            curMenu = item
            return true
        }
    })

    loginPath = byId.get('login').path
    isLoginPage = !!pathToRegexp(loginPath).exec(path)

    barProps = {
        curMenu,
        dispatch,
        menus,
        path
    }
    menusProps = {
        dispatch,
        menus,
        path
    }
    showOrHide = menusCollapsed ? ' hide' : ''

    return (
        <React.Fragment>
            <Layout className="base-app">
                <Header logout={logout} />
                <Layout className="main">
                    <Sider
                        width={200}
                        className="fixed silder"
                        collapsible
                        collapsed={menusCollapsed}
                        onCollapse={onCollapse}
                    >
                        <SiderMenus {...menusProps} />
                    </Sider>
                    <Layout className={`content-max${showOrHide}`}>
                        <RouterBar {...barProps} />
                        <Content className="content">
                            <Switch>
                                {routers.reduce(
                                    (prev, { path, ...dynamics }) => {
                                        if(dynamics.pid !== '-1'){
                                            dynamics.app = root;
                                            prev.push(
                                                <Route
                                                    exact
                                                    key={path}
                                                    path={path}
                                                    component={dynamic({
                                                        ...dynamics
                                                    })}
                                                />)
                                            }
                                        return prev
                                    },
                                    []
                                )}
                            </Switch>
                        </Content>
                        <Footer className="footer">
                            <a href="https://ant.design">Ant Design</a>
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}

AppBase.propTypes = {
    root: PropTypes.object,
    menus: PropTypes.object,
    token: PropTypes.string,
    path: PropTypes.string,
    menusCollapsed: PropTypes.bool
}

export default connect(({ app }) => ({
    root: app.root,
    token: app.token,
    menus: app.menus,
    path: app.locationPath,
    menusCollapsed: app.menusCollapsed
}))(AppBase)
