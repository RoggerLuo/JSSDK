import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
let count = 1
class CollegeStudents extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'collegeStudents/getCollege'})
         
       
    }


    render() {
      console.log(this.props.list)
      
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.schoolStudentId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.list}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'collegeStudents/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('collegeStudents')(CollegeStudents)

