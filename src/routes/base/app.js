import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from 'antd'

import Header from './app/header'
import RouterBar from './app/routerBar'
import SiderMenus from './app/siderMenus'

const { Footer, Content, Sider} = Layout;

const App = (props) => {
    return (
        <Layout style={{ minHeight: '100vh'}}>
        <Header />
        <Layout style={{paddingTop:'64px'}}>
          <Sider width={200} 
            style={{ background: '#fff' }}
            className="fixed"
            trigger={null}
            collapsible
            collapsed={props.app.menusCollapsed}>
            <SiderMenus {...props}/>
          </Sider>
          <Layout className="content-max">
            <RouterBar {...props}/>
            <Content style={{ background: '#fff', padding: 12, margin: 0, minHeight: 280 }}>
              {/* <ContentRoute {...this.props}/> */}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <a href="https://ant.design">Ant Design</a>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
}

App.propTypes = {
    data: PropTypes.object
}

export default connect(({  app }) => ({
    app,
}))(App)
