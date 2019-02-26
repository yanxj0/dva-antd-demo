import React, { Component } from 'react'
import { connect } from 'dva'
import {
    Card,
    Select
} from 'antd'
import echarts from 'echarts'
import { getJS } from '@services/githubApi'

const Option = Select.Option;

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: ['javascript', 'java', 'c', 'c++', 'python'],
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
    changeHandler = label => {
        this.setState({ label })
        this.getFormApi(label)
    }

    render() {
        return (
            <div className="home-page">
                <Card
                    title={
                        <React.Fragment>
                            {`GitHub ${this.state.curLabel}语言 前30开源项目`}
                            <Select
                                style={{ width: 120 }}
                                defaultValue={this.state.curLabel}
                                loading={this.state.loading}
                                onChange={this.changeHandler}
                            >
                                {this.state.list.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </React.Fragment>
                    }
                >
                    <div id="homePage" className="chart-container" />
                </Card>
            </div>
        )
    }
}

export default connect(({ app }) => ({
    app
}))(Home)
