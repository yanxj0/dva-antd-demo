import React from 'react'
import { Layout, Menu, Icon } from 'antd'

const { Header } = Layout

const RootHeader = (props) => (
    <Header className="header clearfix fixed">
        <div className="logo">Logo</div>
        <div className="menu">
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[]}
            >
            </Menu>
        </div>
        <div className="poweroff">
            <Icon type="poweroff" onClick={props.logout}/>
        </div>
    </Header>
)

export default RootHeader
