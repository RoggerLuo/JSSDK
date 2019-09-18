import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
import Modal from './addAllocation'
import tableLess from './index.less'

class ArrangeClassroom extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'arrangeClassroom/getArrange'})
        Model.dispatch({type:'roomInfo/getRoom'})
    }
    render() {
        if(!this.props.data) return null
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    className={tStyles.table}
                    columns={columns(this.props)}
                    dataSource={this.props.dataSource}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={false}
                    onChange={pageInfo=>Model.dispatch({type:'arrangeClassroom/changePage',pageInfo})}
                    rowClassName={tableLess.rowClass}

                />
                <Modal/>
            </div>
        )
    }
}
const Arranges = Model.connect('arrangeClassroom')(ArrangeClassroom)
export default Model.connect('roomInfo')(Arranges)

