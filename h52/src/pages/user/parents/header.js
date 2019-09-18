import React from "react"
import styled from 'styled-components'
import ParentsDatepicker from 'components/datepicker/parentsdate'
import Search from 'components/search/parentsSearch'
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
          <ParentsDatepicker onChange={()=>{}}  />                  
            <Search />
            <div></div>
        </SearchRow>
    ) 
}
export default Header
