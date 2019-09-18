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

    const areas = [...props.areas]
    areas.unshift({area:'全部',schoolAreaId:''})

    return (
        <SearchRow>     
            <div style={{display:'flex'}}>
               <MapSelectProvinces />
               <div style={{width:20}}></div>
               <MapSelectCities />
               <div style={{width:20}}></div>
               <Select 
                    style={{ width: '150px' }}
                    onSelect={value=>{
                        Model.change('roomInfo','areaId',value)
                        Model.dispatch({type:'roomInfo/getRoom'})
                    }}
                    placeholder={'请选择分区'}
                >
                    {areas.map((el,ind)=>{
                        return <Select.Option value={el.schoolAreaId} key={ind}>{el.area}</Select.Option>
                    })}
                </Select>
                <div style={{width:20}}></div>

                <Select 
                    style={{ width: '150px' }}
                    onSelect={value=>{
                        Model.change('roomInfo','areaId',value)
                        Model.dispatch({type:'roomInfo/getRoom'})
                    }}
                    placeholder={'请选择学校'}
                >
                    {schools.map((el,ind)=>{
                        return <Select.Option value={el.schoolInfoId} key={ind}>{el.schoolName}</Select.Option>
                    })}
                </Select>
            </div>

            <AddButton onClick={openAddCategory} > + 添加分类</AddButton>
        </SearchRow>
    ) 
}
export default Model.connect('commonData')(Header)
