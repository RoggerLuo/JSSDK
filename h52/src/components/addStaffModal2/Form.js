import React from 'react'
import {Model} from 'dvax'
import { message,Input} from 'antd'
import {Staff,StaffSpan} from './FormComponents'
import TreeComp from './TreeComp'
const Search = Input.Search;
const FormComp = (props) => {
    return(
        <div>
            <Search
                placeholder="输入姓名或拼音搜索"
                onSearch={value => {
                    Model.run('addStaffModal',function*({fetch}){
                        const res = yield fetch(`subject-setting/search-employee`,{query:{keyword:value}})
                        Model.change('addStaffModal','employees',res.results)
                    })
                }}
                style={{ width: '100%' }}
            />
            <div style={{height:'15px'}}></div>
            <div style={{display:'flex',height:'330px'}}>
                <div style={{flex:1}}>
                    <TreeComp {...props}/>
                </div>
                <div style={{flex:1}}>
                    {props.employees.map((em,ind)=>{
                        return <Staff key={ind} {...em} selected_employees={props.selected_employees}/>
                    })}
                </div>
            </div>
            <div style={{border:'1px solid #ccc',minHeight:'33px',borderRadius:'5px',width:'100%',lineHeight: '29px', paddingLeft:'10px'  }}>
                {props.selected_employees.map((em,ind)=>{
                    return <StaffSpan key={ind} {...em} onClick={user_id=>{
                        props.reduce(state=>{
                            const obj = state.selected_employees.find(el=>el.user_id===user_id)
                            const index = state.selected_employees.indexOf(obj)
                            const selected_employees= [...state.selected_employees]
                            selected_employees.splice(index,1)
                            return {...state,selected_employees}
                        })

                    }}/>
                })}
            </div>
        </div>
    )
}
export default Model.connect(['addStaffModal'])(FormComp)
