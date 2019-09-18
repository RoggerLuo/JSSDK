import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
import Modal from './modal'
import Modal2 from './changeModal'
import tableLess from './index.less'

class ArrangeClassroom extends React.Component { 
    componentDidMount(){ 
        Model.run('schedule',function*({change,put}){
            yield change('query.cityId','')
            yield change('cityName',undefined)
        })
        Model.dispatch({type:'schedule/getData'})
    }
    render() {
        return (
            <div>
                <Header {...this.props} />
                <Table
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
export default Model.connect(['commonData','schedule'])(ArrangeClassroom)

