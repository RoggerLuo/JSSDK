/*import React from "react"
import { Model,connect } from 'dvax'
import Datepicker from 'components/datepicker';
import Search from 'components/search/platformSearch';
import Select from 'components/select/platformSelect';
import { Table } from 'antd';
import tStyles from 'assets/style/table.less';
import styles from './index.less';
import { formatDate, getDateTime } from 'utils/tools';
import Constants from "utils/constants";
import { clear, getItem } from 'utils/localStorage';
import styled from 'styled-components'
import filterConfig from './filterConfig'
import {redirect} from 'components/history'
import mutate from 'dvax/mutate'
import 'dvax/dateFormat'
const SearchRow = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content:space-between;
    alignItems:start;
`
const AddButton = styled.div`
  color: white;
  padding: 8px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 36px;
  background: #576ff8;
  cursor: pointer;
  width: 116px;
  height: 36px;
  margin-left:20px;
`
Model.create({
  namespace: 'userPlatform',
  state: {
    beginTime: '',
    endTime: '',
    keywords: '',
    cityId: '',
    schoolAreaId: '',
    position: '',
    paperState: '',
    
    list: [],

    isUploading: false,
    btnName: '上传文件',
    pagination:{
        pageNum: 1,
        pageSize: 10,
        totalCount: 20, // test value
    }
  }
})

import columns from './columns'

class Loader extends React.Component { 
    componentDidMount(){ 
        this.props.run(function*({fetch,change,reduce}){
            const res = yield fetch(`user-platformteacher`,{method:'get'})
            if(res.hasErrors) return
            //const time
            const arr = res.data.records.map(function(obj,index){
                     
                return  new Date(obj.birthday).format("yyyy-MM-dd");           
             })          
           res.data.records.map(function(objs,ind){
                
            return objs.birthday=arr[ind]
           })
            console.log(res)
          yield change('list',res.data.records)
          yield reduce(state=>{    //深度修改state
             return mutate(state)
                    .with('pagination.totalCount',res.data.totalRecords)
                    .done()
          })

        })
    }

    render() {
        return <div></div>
    }
}
/* 标准化pagination每个table都能使用 */
// function preparePagination({totalCount,pageSize,pageNum}){
//     if(totalCount > pageSize) {
//         return { 
//             pageSize: pageSize,
//             defaultCurrent: pageNum,
//             total: totalCount,
//             showQuickJumper: true 
//         } 
//     }else{
//         return false        
//     }
// }
// function onPageChange(pageInfo){
//     const currentPage = pageInfo.current
// }

// function UserPlatform(props){
//     //value => this.selectChange(select.name, value)
//         
//    return (
//         <div>
//             <SearchRow>          
//                 <div style={{display:'flex'}}>
//                     {filterConfig.map((select,i) => {
//                         return <Select {...select} value={props[select.name]} handleChange={()=>{}} key={i} />
//                     })}
//                 </div>
//                 <Search />
//                 <AddButton onClick={()=>{redirect('/home/user/platform/add')}} > + 添加人员</AddButton>
//             </SearchRow>
//             <Loader run={props.run}/>


//             <Table
//                 className={tStyles.table}
//                 columns={columns}
//                 dataSource={props.list}
//                 locale={{emptyText: '暂无数据'}}
//                 bordered
//                 pagination={preparePagination(props.pagination)}
//                 onChange={onPageChange}
//                 rowKey={record=>record.platformTeacherId }
//             />
//         </div>
//     )  
// }

// export default Model.connect('userPlatform')(UserPlatform)


import React from "react"
import { Model } from 'dvax'
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
class UserSchool extends React.Component { 
    componentDidMount(){ 
        Model.dispatch({type:'userSchool/getUserschool'})
         
       
    }
    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Table
                    rowKey={record=>record.schoolTeacherId}
                    className={tStyles.table}
                    columns={columns}
                    dataSource={this.props.list}
                    locale={{emptyText: '暂无数据'}}
                    bordered
                    pagination={this.props.pagination}
                    onChange={pageInfo=>Model.dispatch({type:'userSchool/changePage',pageInfo})}
                />
            </div>
        )
    }
}
export default Model.connect('userSchool')(UserSchool)

