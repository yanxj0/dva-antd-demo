import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'

class EuropeAmerica extends Component {
    render() {
        return (
            <Row>
                <Col className='home-page'>欧美电影，来了！</Col>
            </Row>
        )
    }
}

export default connect(({ film }) => ({
    film
}))(EuropeAmerica)