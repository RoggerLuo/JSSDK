import React from 'react'
import {Model} from 'dvax'
import { Message,Input} from 'antd'
import {Staff,StaffSpan} from './FormComponents'
import TreeComp from './TreeComp'
const Search = Input.Search;
import {searchEmployees} from './data'
import { Spin, Icon } from 'antd';
import { Table, Divider, Tag } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const FormComp = (props) => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'display_name',
          key: 'display_name',
          render: (text,record) => <Staff {...record} selected_employees={props.selected_employees} orgPath={props.orgPath} currentOrgId={props.currentOrgId}/>,
        },
        
    ]
    return(
        <div>
            <Search
                placeholder="输入姓名或拼音搜索"
                onSearch={keyword => {
                    Model.run('addStaffModal',function*({fetch}){
                        const employees = yield searchEmployees({fetch,keyword}) 
                        Model.change('addStaffModal','employees',employees)
                    })
                }}
                onChange={(e)=>{
                    if(e.target.value.length>5) {
                        Message.warning('搜索支持最大输入5个中文字')
                        return
                    }
                    Model.change('addStaffModal','searchText',e.target.value)
                }}
                value={props.searchText}
                style={{ width: '100%' }}
            />
            <div style={{height:'15px'}}></div>
            
            <div style={{display:'flex',height:'330px',marginBottom: '10px'}}>
                <div style={{flex:1,overflow:'auto',display:'flex'}}>
                    <TreeComp {...props}/>
                </div>

                <div style={{flex:1,overflow:'auto',paddingLeft:'10px'}}>
                    
                    
                    {
                        props.loadingEmployees?
                            <div style={{display:'flex',height:'100%'}}><Spin indicator={antIcon} style={{margin:'auto'}}/></div>
                            :
                            <Table 
                                columns={columns}
                                dataSource={props.employees}
                                rowKey={record=>record.id}
                                size="small"
                                showHeader={false}
                                bordered={false}
                                pagination={{pageSize:10}}
                            />
                            /* props.employees.map((em,ind)=>{
                                return <Staff key={ind} {...em} selected_employees={props.selected_employees} orgPath={props.orgPath} currentOrgId={props.currentOrgId}/>
                            }) */
                    }
                </div>

            </div>

            <div style={{border:'1px solid #ccc',minHeight:'33px',borderRadius:'5px',width:'100%',lineHeight: '29px', paddingLeft:'10px'  }}>
                {props.selected_employees.map((em,ind)=>{
                    return <StaffSpan key={ind} {...em} onClick={user_id=>{
                        props.reduce(state=>{
                            const selected_employees= [...state.selected_employees]
                            selected_employees.splice(ind,1)
                            return {...state,selected_employees}
                        })
                    }}/>
                })}
            </div>
        </div>
    )
}
export default Model.connect(['addStaffModal'])(FormComp)
