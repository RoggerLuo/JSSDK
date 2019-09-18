import React from "react"
import Select from 'components/select'
import styled from 'styled-components'
import filterConfig from './filterConfig'
import Search from '../../../components/search/schoolSearch'
//import {openAddCourse} from './add'
import {redirect} from 'components/history'
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
                {filterConfig.map((select,i) => {
                    return <Select {...select} value={props[select.name]} handleChange={()=>{}} key={i} />
                })}
            </div>
            <Search />
            <AddButton onClick={()=>{redirect('/home/user/school/add')}} > + 添加人员</AddButton>
        </SearchRow>
    ) 
}
export default Header
