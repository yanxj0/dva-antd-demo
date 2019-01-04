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

const App = ({ dispatch, children, menus, path, menusCollapsed }) => {
    function onCollapse() {
        dispatch({ type: 'app/toggleMenus' })
    }

    const byId = menus.byId
    let loginPath = null,
        isLoginPage = null,
        menusProps = null,
        barProps = null,
        curMenu = null
    //404
    const found = [...byId.values()].some(
        item => {
            if(item.path === path){
                curMenu = item;
                return true;
            }
        }
    )

    if (found) {
        loginPath = byId.get('login').path
        isLoginPage = !!pathToRegexp(loginPath).exec(path)
    }

    if (!isLoginPage) {
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
                        <Header />
                        <Layout style={{ paddingTop: '64px' }}>
                            <Sider
                                width={200}
                                style={{ background: '#fff' }}
                                className="fixed"
                                collapsible
                                collapsed={menusCollapsed}
                                onCollapse={onCollapse}
                            >
                                <SiderMenus {...menusProps} />
                            </Sider>
                            <Layout className="content-max">
                                <RouterBar {...barProps}/>
                                <Content
                                    style={{
                                        background: '#fff',
                                        padding: 12,
                                        margin: 0,
                                        minHeight: 280
                                    }}
                                >
                                    {children}
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>
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
    data: PropTypes.object
}

export default connect(({ app }) => ({
    menus: app.menus,
    path: app.locationPath,
    menusCollapsed: app.menusCollapsed
}))(App)
