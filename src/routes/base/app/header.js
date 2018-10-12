import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const RootHeader = () => (
    <Header className="header clearfix fixed">
        <div className="logo">Logo</div>
        <div className="left-menu" style={{float: 'left', width: '50%'}}>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[]}
                style={{ lineHeight: '64px' }} >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </div>
    </Header>)

export default RootHeader