import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'

class Home extends Component {
    render() {
        return (
            <Row>
                <Col className='home-page'>首页，来了！</Col>
            </Row>
        )
    }
}

export default connect(({ app }) => ({
    app
}))(Home)
