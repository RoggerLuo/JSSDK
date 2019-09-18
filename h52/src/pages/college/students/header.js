import React from "react"
import Select from 'components/select'
import styled from 'styled-components'
import {MapSelectProvinces,MapSelectCities,SelectSchool} from './filterConfig'
//import {openAddCourse} from './add'
import {redirect} from 'components/history'
import Search from 'components/search/studentsSearch'
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
  // const schools = props.schools.slice()
  // schools.unshift({schoolInfoId:'',schoolName:'全部'})
    return (
       <SearchRow>          
            <div style={{display:'flex'}}>
           
              <SelectSchool />
            </div>       
            <Search />
            
        </SearchRow>
    ) 
}
export default Header

