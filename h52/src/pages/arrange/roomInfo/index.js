import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'


function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}
  
class CourseInfo extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'roomInfo/getRoom'})
    }
    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.classroomInfoId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.list}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={{...this.props.pagination,showSizeChanger:true,onShowSizeChange}}
                    onChange={pageInfo=>Model.dispatch({type:'courseCategory/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('roomInfo')(CourseInfo)
