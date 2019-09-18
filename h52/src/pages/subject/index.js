import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
function onShowSizeChange(current, pageSize) {
    Model.dispatch({type:'courseInfo/changePage',pageInfo:{pageSize,current}})
}
class Subject extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'subject/get'})
    }
    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record._id}
                    className={tStyles.table}
                    columns={columns(this.props)}
                    dataSource={this.props.subjects}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={false}
                    onChange={pageInfo=>Model.dispatch({type:'courseInfo/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('subject')(Subject)
//{...this.props.pagination,showSizeChanger:true,onShowSizeChange}