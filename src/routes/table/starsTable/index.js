import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Card  } from 'antd'
import { getSomeBodyStars } from '@services/githubApi'

const SOMEBODY = 'nelsonkuang'
const PERPAGE = 13

class StarsTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            columns:[],
            data: [],
            pagination: {},
            page: 1
        }
        this.getTableSource.bind(this)
        this.getUrlParameters.bind(this)
        this.getPaginationProps.bind(this)
    }
    componentWillMount(){
        this.getTableSource(SOMEBODY,{page:1})
    }
    getTableSource = async (somebody, params) => {
            this.setState({ loading: true });
            const req = await getSomeBodyStars(somebody, { per_page:PERPAGE, page:params.page })
            const pagination = this.getPaginationProps(req.headers.link, params.page)
            const data = req.data.map((item)=>{
                return {
                    key: item.id,
                    repo: {
                      displayName: item.name,
                      link: item.html_url,
                    },
                    owner: {
                      displayName: item.owner.login,
                      link: item.owner.html_url,
                    },
                    createdAt: new Date(item.created_at).toLocaleString(),
                    stargazersCount: item.stargazers_count,
                    forksCount: item.forks_count,
                  };
            })
            const columns = [{
                title: '项目名称',
                dataIndex: 'repo',
                key: 'repo',
                render: repo => <a href={repo.link} target="_blank" rel="nofollow noopener noreferrer">{repo.displayName}</a>,
                width: '25%'
            }, {
                title: '创建者',
                dataIndex: 'owner',
                key: 'owner',
                render: owner => <a href={owner.link} target="_blank" rel="nofollow noopener noreferrer">{owner.displayName}</a>,
                width: '25%'
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: '20%'
            }, {
                title: 'Stars',
                dataIndex: 'stargazersCount',
                key: 'stargazersCount',
                width: '15%'
            }, {
                title: 'Forks',
                dataIndex: 'forksCount',
                key: 'forksCount',
                width: '15%'
            }];
            this.setState({
                pagination,
                data,
                columns,
                loading:false
            })
    }
    getPaginationProps = (link, currentPage) => { // 按github规则通过http响应的头部head.link信息获取分页参数
        let total = 0;
        let str = link.split(',').find(s => s.indexOf('rel="last"') > -1);
        if (str) {
            total = this.getUrlParameters(str.split(';')[0].slice(1, -1))['page'] || 1;
        } else {
            str = link.split(',').find(s => s.indexOf('rel="prev"') > -1);
            if (str) {
                total = (this.getUrlParameters(str.split(';')[0].slice(1, -1))['page'] || 1) * 1 + 1;
            }
        }

        return {
            total: total * PERPAGE,
            current: currentPage * 1,
            defaultPageSize: PERPAGE,
            pageSize: PERPAGE, // github默认每页30条
            onChange: (page, pageSize) => { // 分页跳转
                this.getTableSource(SOMEBODY, { page })
            }
        };
    } 
    getUrlParameters = url =>
        url.match(/([^?=&]+)(=([^&]*))/g).reduce(
            (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
        );
    render() {
        const { loading,columns,data,pagination } = this.state
        return (
            <React.Fragment>
                <Card title={(<span>异步基础表格 - Github用户(ID: 
                    <a href="https://github.com/nelsonkuang" target="_blank" 
                    rel="nofollow noopener noreferrer">Nelsonkuang</a>) 关注的项目列表</span>)}>
                    <Table 
                        bordered
                        size="middle"
                        loading={loading}
                        columns={columns}
                        dataSource={data}
                        pagination={pagination}>
                    </Table>
                </Card>
            </React.Fragment>
        )
    }
}

export default connect(({ table }) => ({
    table
}))(StarsTable)