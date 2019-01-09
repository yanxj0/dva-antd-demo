import React, { Component } from 'react'
import { connect } from 'dva'
import {
    Row,
    Col,
    Card,
    Menu,
    Dropdown,
    Button,
    Icon,
    message,
    Spin
} from 'antd'
import echarts from 'echarts'
import { getJS } from '@services/githubApi'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: ['javascript', 'java', 'c', 'c++'],
            chart: null,
            series: [],
            yData: [],
            curLabel: 'javascript',
            loading: false
        }
        this.getFormApi.bind(this)
        this.showChart.bind(this)
        this.changeHandler.bind(this)
    }

    componentWillMount() {
        this.getFormApi(this.state.curLabel)
    }
    componentDidMount() {
        let dom = document.querySelector('#homePage')
        this.setState({ chart: echarts.init(dom) }, () => {
            this.state.series.length && this.showChart()
        })
    }
    getFormApi = language => {
        this.setState({ loading: true })
        getJS({
            q: `language:${language}`,
            sort: 'stars'
        }).then(({ data: { items } }) => {
            let yData = []
            const series = items.reverse().reduce(
                (prv, item) => {
                    yData = [...yData, item.name]
                    prv[0].data = [...prv[0].data, item.stargazers_count]
                    prv[1].data = [...prv[1].data, item.forks_count]
                    prv[2].data = [...prv[2].data, item.watchers_count]
                    return prv
                },
                [
                    { name: 'stars', type: 'bar', stack: '总量', data: [] },
                    { name: 'forks', type: 'bar', stack: '总量', data: [] },
                    { name: 'watchs', type: 'bar', stack: '总量', data: [] }
                ]
            )

            this.setState({ series, yData }, () => {
                this.state.chart && this.showChart()
            })
        })
    }
    showChart = () => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['stars', 'forks', 'watchs']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: this.state.yData
            },
            series: this.state.series
        }
        this.state.chart.setOption(option, true)
        this.setState({ loading: false })
    }
    changeHandler = evt => {
        const curLabel = evt.key
        this.setState({ curLabel })
        this.getFormApi(curLabel)
    }

    render() {
        const menu = (
            <Menu onClick={this.changeHandler}>
                {this.state.list.map(item => (
                    <Menu.Item key={item}>{item}</Menu.Item>
                ))}
            </Menu>
        )
        return (
            <div className="home-page">
                <Row gutter={10} className="row">
                    <Col md={24} className="col">
                        <Card className="card"
                            title={
                                <Dropdown overlay={menu} className="dropdown">
                                    <Button>
                                        <Spin spinning={this.state.loading} />
                                        {this.state.curLabel}
                                        <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            }
                        >
                            <div id="homePage" className="chart-container" />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(({ app }) => ({
    app
}))(Home)
