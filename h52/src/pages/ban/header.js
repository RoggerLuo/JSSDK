import React from "react"
import styled from 'styled-components'
import {openAdd} from './detail'
import {Model} from "dvax"
import { Input, Select } from 'antd'
const $ = Model.assign('ban')
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
function Header(props){
    return (
        <SearchRow>     
            <div style={{display:'flex',margin: 'auto 0'}}>
                <Select
                    onChange={(value)=>{        // onchange
                        $.change('query.subjectId',value||'')
                        $.put({type:'get'})
                    }}
                    placeholder={'选择板块'}    //placeholder
                    style={{ width: '150px' }}
                    allowClear
                >
                    {props.subjects             // data source
                        .map((el,ind)=>(
                            <Select.Option 
                                value={el._id}  // value key
                            key={ind}>
                                {el.name}       {/* text key */}
                            </Select.Option>
                        )
                    )}
                </Select>
                <div style={{width:20}}></div>
            </div>
            <AddButton onClick={openAdd} > + 添加用户 </AddButton>
        </SearchRow>
    ) 
}
export default Header