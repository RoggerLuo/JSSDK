import React from "react"
import styled from 'styled-components'
import {Areas,MapSelectCities,MapSelectProvinces,SelectedSchool} from './filterConfig'
const SearchRow = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content:space-between;
    alignItems:start;
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
                <SelectedSchool />
            </div>
            
        </SearchRow>
    ) 
}
export default Header
