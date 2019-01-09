import React, { Component } from 'react'
import { connect } from 'dva'
import { Table  } from 'antd'

class StarsTable extends Component {
    render() {
        return (
            <div></div>
        )
    }
}

export default connect(({ table }) => ({
    table
}))(StarsTable)