import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
class CourseInfo extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'year/getRoom'})
    }
    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.schoolYearId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.list}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'year/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('year')(CourseInfo)
