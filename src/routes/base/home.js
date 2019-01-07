import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import echarts from 'echarts'
import { getJS } from '@services/githubApi'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart: null,
            series: [],
            yData: []
        }
        this.showChart.bind(this)
    }

    componentWillMount() {
        getJS({
            q: 'language:javascript',
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

            this.setState({
                series,
                yData
            })
            this.showChart()
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
    }
    componentDidMount() {
        let dom = document.querySelector('#homePage')
        this.setState({ chart: echarts.init(dom) })
    }

    render() {
        return <div id="homePage" className="home-page" />
    }
}

export default connect(({ app }) => ({
    app
}))(Home)
