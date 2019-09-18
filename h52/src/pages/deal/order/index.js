import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
class DealOrder extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'dealOrder/getDeal'})
    }
    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.orderId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.orderList}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'dealOrder/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('dealOrder')(DealOrder)

