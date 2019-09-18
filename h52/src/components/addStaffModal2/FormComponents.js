import React from 'react'
import {Model} from 'dvax'
import { Avatar,Checkbox, Message } from 'antd'
import delPng from './del.png'
import styled from 'styled-components'
import {api} from 'src'
const HoverSpan = styled.span`
    opacity:0;
    display: inline-block;
    width: 70px;
    margin-left: -50px;
    text-align: right;
    position:relative;
    bottom:1px;
    cursor:pointer;
    &:hover {
        opacity:1;
    }
`
const $ = Model.assign('addStaffModal')
function warning(data) {
    if(data.length>=5){
        Message.warning(`不能超过5个人`)
        return true
    }
    return false
}
export function Staff(props){
    const {avatar,name,username,user_id,selected_employees} = props
    let checked = false
    const obj = selected_employees.find(el=>el.user_id===user_id)
    if(obj){
        checked = true
    }
    function onChange(e) {
        if(e.target.checked){
            const data = [...$.get().selected_employees]
            const obj = data.find(el=>el.user_id===user_id)
            if(data.indexOf(obj)===-1){
                if(warning(data)) return 
                data.push(props)
            }
            $.change('selected_employees',data)
        }else{
            const data = [...$.get().selected_employees]
            const obj = data.find(el=>el.user_id===user_id)
            data.splice(data.indexOf(obj),1)
            $.change('selected_employees',data)
        }
    }
    return (
        <div style={{padding:'6px 0'}}>
            <Checkbox onChange={onChange} checked={checked}>
                <Avatar size="small" src={`${api}/medias/${avatar}`}  /> &nbsp;
                {name}
            </Checkbox>
        </div>
    )
}
export function StaffSpan({user_id,avatar,name,hideDelete,onClick=()=>{}}){
    return (
        <span style={{padding:'0px 10px 0 0px', display: 'inline-block'}} onClick={()=>onClick(user_id)}>
            <Avatar size="small" src={`${api}/medias/${avatar}`} /> &nbsp;
            {name}
            {hideDelete?null: <HoverSpan>&nbsp;<img src={delPng} width="16"/> </HoverSpan>}
        </span>
    )
}

