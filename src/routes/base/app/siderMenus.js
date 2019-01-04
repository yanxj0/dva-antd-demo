import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import pathToRegexp from 'path-to-regexp'

const { SubMenu } = Menu

const RootSider = ({ menus, path, dispatch }) => {

    const byId = menus.byId;
    const byPid = menus.byPid;
    const curId = [...byId.values()].filter(item => pathToRegexp(`${item.path}`).exec(path))[0];
    const curMenus = [...byId.values()].filter(item => pathToRegexp(`${item.path}/:path*`).exec(path));

    function caleMenus(item) {
        if (item.display && item.display === 'block') {
            if (byPid.get(item.id)) {
                return <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                    {[...byPid.get(item.id).values()].map((subItem) => {
                        return caleMenus(subItem);
                    })}
                </SubMenu>
            } else {
                return <Menu.Item key={item.id} to={item.path}>
                    <Link to={item.path}><span><Icon type={item.icon} /><span>{item.name}</span></span></Link>
                </Menu.Item>
            }
        }
    }

    return (
        <div className="menus">
           <Menu
           theme="dark"
           defaultSelectedKeys={[curId.id]}
           defaultOpenKeys={curMenus.map(item=>item.id)}
           mode="inline">
               {[...byPid.get('0').values()].map((item) => {
                   return caleMenus(item);
               })}
           </Menu>
        </div>
    )
}

export default RootSider
