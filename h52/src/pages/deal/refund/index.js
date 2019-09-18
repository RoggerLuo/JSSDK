import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
class DealRefund extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'dealRefund/getDeal'})
         
       
    }


    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.refundOrderId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.refundList}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'dealRefund/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('dealRefund')(DealRefund)

