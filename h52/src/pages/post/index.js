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
        Model.dispatch({type:'post/get'})
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
                    dataSource={this.props.list}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={{...this.props.pagination,showSizeChanger:true,onShowSizeChange}}
                    onChange={pageInfo=>Model.dispatch({type:'post/changePage',pageInfo})} // 点击页码
                />
            </div>
        )
    }
}
export default Model.connect(['subject','post'])(CourseInfo)
