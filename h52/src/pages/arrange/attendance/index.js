import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
import Modal from './addModal'
import Modal2 from './cancelModal'
import tableLess from './index.less'
class ArrangeClassroom extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'attendance/getData'})
    }
    render() {
        return (
            <div>
                <Header {...this.props} />
                <Table
                    rowkey={record=>record.vacationId}
                    className={tStyles.table}
                    columns={columns(this.props)}
                    dataSource={this.props.list}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'arrangeClassroom/changePage',pageInfo})}
                    rowClassName={tableLess.rowClass}
                />
                <Modal/>
                <Modal2/>
            </div>
        )
    }
}
export default Model.connect('attendance')(ArrangeClassroom)

