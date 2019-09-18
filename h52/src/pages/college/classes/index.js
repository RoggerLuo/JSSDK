import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
class CollegeClasses extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'collegeClasses/getCollege'})
         
       
    }


    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.schoolClassesId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.listclasses}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'collegeClasses/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('collegeClasses')(CollegeClasses)

