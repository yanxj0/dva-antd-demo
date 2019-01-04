import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'

const RouterBar = ({ curMenu, dispatch, menus }) => {
    const byId = menus.byId
    const urlArr = curMenu.path.split('/')
    const routers = urlArr.reduce((prv, item) => {
        if (item !== '') {
            prv.push(byId.get(item))
        }
        return prv
    }, [])
    return (
        <Breadcrumb className="routerbar" separator=">">
            {routers.map(item => {
                return (
                    <Breadcrumb.Item href={`#${item.path}`} key={item.id}>
                        {item.name}
                    </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}

RouterBar.propTypes = {
    // match: PropTypes.object
}

export default RouterBar
