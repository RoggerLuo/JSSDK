import React from "react"
import Select from 'components/select'
import styled from 'styled-components'
import {Areas,MapSelectCities,MapSelectProvinces,Schools} from './filterConfig'
import ParentsDatepicker from 'components/datepicker/parentsdate'
import {redirect} from 'components/history'
import Search from 'components/search/applicationSearch'
// import {showModal} from './check'

const SearchRow = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content:space-between;
    alignItems:start;
`
const div = styled.div`
  color: white;
  padding: 8px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
 
  margin-left:20px;
`
function Header(props){
    return (
        <SearchRow>
          <div style={{display:'flex'}}>
            <MapSelectProvinces />
            <div style={{width:20}}></div>
            <MapSelectCities />
             <div style={{width:20}}></div>  
            <Areas />
             <div style={{width:20}}></div>
             <Schools />
           
          </div>
            <Search />

           
        </SearchRow>
    ) 
}
export default Header
