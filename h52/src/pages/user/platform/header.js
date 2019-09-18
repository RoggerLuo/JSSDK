import React from "react"
import styled from 'styled-components'
import SelectedAreaSchool from './filterConfig'
import {redirect} from 'components/history'
import Search from 'components/search/platformSearch'
import Roles from './role'
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
  background: #1890FF;
  cursor: pointer;
  width: 116px;
  height: 36px;
  margin-left:20px;
`
function Header(props){
    return (
       <SearchRow>          
            <div style={{display:'flex'}}>
               <SelectedAreaSchool/>
                <div style={{width:20}}></div>
               <Roles />
            </div>
            <Search />
            <AddButton onClick={()=>{redirect('/home/user/platform/add')}} > + 添加人员</AddButton>
        </SearchRow>
    ) 
}
export default Header

 // {filterConfig(props).map((item,i) => {
 //                    return (<Select {...item} key={i}/>)
 //                })}
