import React from 'react'
import {Model} from 'dvax'
import { Avatar,Checkbox, Message } from 'antd'
import delPng from './del.png'
import styled from 'styled-components'
import {api} from 'src'

const EllipsisSpan = styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 150px;
    display: inline-block;
    vertical-align: middle;
`
const OrgPath = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    padding-left: 10px;
    color: #bbb;
`
const HoverSpan = styled.span`
    opacity:0;
    display: inline-block;
    width: 100%;
    margin-left: -100%;
    left:20px;
    text-align: right;
    position:relative;
    bottom:1px;
    cursor:pointer;
    &:hover {
        opacity:1;
    }
`
function lengthLimitWarning(data) {
    if(data.length>=5){
        Message.warning(`不能超过5个人`)
        return true
    }
    return false
}
export function Staff(props){
    let job_title = '/'
    const position = props.positions.find(el=>el.org_id === props.currentOrgId) 
    if(position){
        job_title += position.job_title
    }
    let {avatar,name,username,user_id,selected_employees} = props
    let checked = false
    const obj = selected_employees.find(el=>el.user_id===user_id)
    if(obj){
        checked = true
    }
    function onChange(e) {
        if(e.target.checked){
            const data = [...Model.get('addStaffModal').selected_employees]
            const obj = data.find(el=>el.user_id===user_id)
            if(data.indexOf(obj)===-1){
                if(lengthLimitWarning(data)) return 
                const moreInfo = props.orgPath + job_title
                const emp = {...props}
                emp.moreInfo = moreInfo
                data.push(emp) //{name,avatar,user_id,username}
            }
            Model.change('addStaffModal','selected_employees',data)
        }else{
            const data = [...Model.get('addStaffModal').selected_employees]
            const obj = data.find(el=>el.user_id===user_id)
            data.splice(data.indexOf(obj),1)
            Model.change('addStaffModal','selected_employees',data)
        }
    }
    return (
        <div style={{padding:'6px 0'}}>
            <Checkbox onChange={onChange} checked={checked}>
                <Avatar size="small" src={`${api}/medias/${avatar}`} /> &nbsp; 
                <EllipsisSpan>{name}</EllipsisSpan> 
                <OrgPath>{props.orgPath}{job_title}</OrgPath>
            </Checkbox>
        </div>
    )
}
export function StaffSpan({user_id,avatar,name,hideDelete,onClick=()=>{},...props}){
    return (
        <span style={{padding:'0px 10px 0 0px', display: 'inline-block'}} onClick={()=>onClick(user_id)}>
            <Avatar size="small" src={`${api}/medias/${avatar}`} /> &nbsp;
            <EllipsisSpan>{name}</EllipsisSpan>
            {hideDelete?null: <HoverSpan>&nbsp;<img src={delPng} width="16"/> </HoverSpan>}
        </span>
    )
}


export function StaffDiv({user_id,avatar,name,hideDelete,onClick=()=>{},...props}){
    return (
        <div>
            <span style={{padding:'0px 10px 0 0px', display: 'inline-block'}} onClick={()=>onClick(user_id)}>
                <Avatar size="small" src={`${api}/medias/${avatar}`} /> &nbsp;
                <EllipsisSpan>{name}</EllipsisSpan>
                {hideDelete?null: <HoverSpan>&nbsp;<img src={delPng} width="16"/> </HoverSpan>}
            </span>
            <OrgPath>{props.moreInfo}</OrgPath>
        </div>
    )
}

