import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu
const menus = []

const RootSider = ({ children, app, dispatch }) => {
    return (
        <div className='menus'>
           
        </div>
    )
}

RootSider.propTypes = {
    match: PropTypes.object.isRequired
}

export default RootSider
