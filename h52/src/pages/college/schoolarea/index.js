import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
class CollegeSchoolarea extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'collegeSchoolarea/getCollege'})
         
       
    }


    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.schoolAreaId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.listarea}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'collegeSchoolarea/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('collegeSchoolarea')(CollegeSchoolarea)

