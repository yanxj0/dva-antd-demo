import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from 'antd'
import './index.less'
import Header from './header'
import RouterBar from './routerBar'
import SiderMenus from './siderMenus'

const { Footer, Content, Sider } = Layout

const App = ({dispatch, children, app}) => {
    function onCollapse() {
        dispatch({ type: 'app/toggleMenus' })
    }

    const isLoginPage = app.locationPath === '/login';

    return (
        <React.Fragment>
            { isLoginPage ? children 
            :<Layout className='base-app'>
                <Header />
                <Layout style={{ paddingTop: '64px' }}>
                    <Sider
                        width={200}
                        style={{ background: '#fff' }}
                        className="fixed"
                        collapsible
                        collapsed={app.menusCollapsed}
                        onCollapse={onCollapse}
                    >
                        <SiderMenus />
                    </Sider>
                    <Layout className="content-max">
                        <RouterBar  />
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
            </Layout>}
        </React.Fragment>
    )
}

App.propTypes = {
    data: PropTypes.object
}

export default connect(({ app }) => ({
    app
}))(App)
