import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from 'antd'
import pathToRegexp from 'path-to-regexp'
import './index.less'
import Header from './header'
import RouterBar from './routerBar'
import SiderMenus from './siderMenus'

const { Footer, Content, Sider } = Layout

const App = ({ dispatch, children, token, menus, path, menusCollapsed }) => {
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

    if (!token && path !== '/login') {
        logout()
    } else if (token && path === '/login') {
        dispatch({
            type: 'app/loginOK',
            payload: {
                token: token
            }
        })
    }

    const byId = menus.byId
    let loginPath = null,
        isLoginPage = null,
        menusProps = null,
        barProps = null,
        curMenu = null
    //404
    const found = [...byId.values()].some(item => {
        if (item.path === path) {
            curMenu = item
            return true
        }
    })

    if (found) {
        loginPath = byId.get('login').path
        isLoginPage = !!pathToRegexp(loginPath).exec(path)
    }

    if (found && !isLoginPage) {
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
    }

    return (
        <React.Fragment>
            {found ? (
                isLoginPage ? (
                    children
                ) : (
                    <Layout className="base-app">
                        <Header logout={logout} />
                        <Layout className="main">
                            <Sider
                                width={200}
                                className="fixed"
                                collapsible
                                collapsed={menusCollapsed}
                                onCollapse={onCollapse}
                            >
                                <SiderMenus {...menusProps} />
                            </Sider>
                            <Layout className="content-max">
                                <RouterBar {...barProps} />
                                <Content className="content">
                                    {children}
                                </Content>
                                <Footer className="footer">
                                    <a href="https://ant.design">Ant Design</a>
                                </Footer>
                            </Layout>
                        </Layout>
                    </Layout>
                )
            ) : (
                children
            )}
        </React.Fragment>
    )
}

App.propTypes = {
    menus: PropTypes.object,
    token: PropTypes.string,
    path: PropTypes.string,
    menusCollapsed: PropTypes.bool
}

export default connect(({ app }) => ({
    token: app.token,
    menus: app.menus,
    path: app.locationPath,
    menusCollapsed: app.menusCollapsed
}))(App)
