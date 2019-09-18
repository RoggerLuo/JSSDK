import React from 'react'
import { Model } from 'dvax'
import Gap from 'dvax/gap'
import styled from 'styled-components'
import toast from 'dvax/toast'
import confirmOk from './confirm.js'
import Tag from './Tag'
const StyledTextarea = styled.textarea`
  height: 50px;
  line-height:1;
  border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #d7d7d7;
    font-size: 14px;
    padding:10px;
    outline:none;
  `
  //margin:auto;
const ConfirmButton = styled.div`
  width: 70px;
   height: 30px;
   border-radius: 4px;
   background-color: #1a98ff;
   font-family: sans-serif;
   font-size: 13px;
   font-weight: 500;
   text-align: center;
   line-height:30px;
   color: #ffffff;
   margin-right:25px;
   cursor:pointer;
`
const CancelButton = styled.div`
    margin-left:25px;
    cursor:pointer;
  width: 70px;
   height: 30px;
   border-radius: 4px;
   border: solid 1px #d7d7d7;
   font-family: sans-serif;
   font-size: 13px;
   font-weight: 500;
   text-align: center;
   line-height:30px;
   color: #999999;
`
import inputx from 'dvax/inputx'
const Textarea = inputx('favorModal',props=><StyledTextarea {...props} placeholder={`请输入收藏关键字`}/>)
function limitLength(val,oldValue){
    const len = 15
    if(val.length>len) {
        toast(`最多输入${len}个字符`,1500)
        return oldValue
    }
    return val
}
function InnerComponent({ close, paperKeywords, textarea }) {
  const selectedArr =  textarea.split(' ').slice(0,1)
    return (
        <div style={{display:'flex',flexDirection:'column',margin: '0px 15px 25px 15px'}}>
            {Gap(20)}
            <Textarea fieldName={'textarea'} callback={limitLength}></Textarea>
            {Gap(10)}
            <div style={{flex:1,height:'300px',overflow:'auto'}}>
              {paperKeywords.map((word,ind)=><Tag selectedArr={selectedArr} name={word} key={ind}/>)}
            </div>
            {Gap(20)}
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <CancelButton onClick={close}>取消</CancelButton>
                <ConfirmButton onClick={()=>confirmOk(close)}>确定</ConfirmButton>
            </div>
        </div>
    )
}
export default InnerComponent
