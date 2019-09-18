import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
import Modal from './check'

class DealApplication extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'dealApplication/getDeal'})
         
       
    }
    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.refundApplicationId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.applicationList}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'dealApplication/changePage',pageInfo})}
                />
                <Modal/>
            </div>
        )
    }
}
export default Model.connect('dealApplication')(DealApplication)

