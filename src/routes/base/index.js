import './index.less'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

const App = ({ dispatch, children, token, path, root }) => {
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
        dispatch({
            type:'app/setRootInstance',
            payload:{
                root
            }
        })
    }
    console.log(path)
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

App.propTypes = {
    token: PropTypes.string,
    path: PropTypes.string,
}

export default connect(({ app }) => ({
    token: app.token,
    path: app.locationPath,
}))(App)
