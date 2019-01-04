import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'

class HongKong extends Component {
    render() {
        return (
            <Row>
                <Col className='home-page'>香港电影，来了！</Col>
            </Row>
        )
    }
}

export default connect(({ film }) => ({
    film
}))(HongKong)