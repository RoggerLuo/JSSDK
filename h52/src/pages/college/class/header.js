import React from "react"
import styled from 'styled-components'
import {openAddCategory} from './detail'
import { Input, Select } from 'antd'
import { Model } from "dvax"
import { MapSelectProvinces, MapSelectCities } from './citySelect'

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
    const schools = [...props.schools]
    schools.unshift({schoolName:'全部',schoolInfoId:''})

    const grades = [...props.grades]
    grades.unshift({schoolGradeName:'全部',schoolGradeId:''})

    return (
        <SearchRow>     
            <div style={{display:'flex'}}>
               <Select 
                    style={{ width: '150px' }}
                    onSelect={value=>{
                        Model.change('class','schoolGradeId',value)
                        Model.dispatch({type:'class/getRoom'})
                    }}
                    placeholder={'请选择年级'}
                >
                    {grades.map((el,ind)=>{
                        return <Select.Option value={el.schoolGradeId} key={ind}>{el.schoolGradeName}</Select.Option>
                    })}
                </Select>
                <div style={{width:20}}></div>

            </div>

            <AddButton onClick={openAddCategory} > + 添加分类</AddButton>
        </SearchRow>
    ) 
}
export default Model.connect('commonData')(Header)
