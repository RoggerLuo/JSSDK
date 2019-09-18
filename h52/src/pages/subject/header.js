import React from "react"
import styled from 'styled-components'
import {openAdd} from './detail'
import {Model} from "dvax"
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
            <div style={{display:'flex'}}>
            </div>
            <AddButton onClick={openAdd} > + 添加版块 </AddButton>
        </SearchRow>
    ) 
}
export default Header
