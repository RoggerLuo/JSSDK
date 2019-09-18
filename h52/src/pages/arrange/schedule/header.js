import React from "react"
import styled from 'styled-components'
import {Areas,MapSelectCities,MapSelectProvinces,SelectedSchool} from './filterConfig'
import {DatePicker,Input,Select} from 'antd'
import {Model} from "dvax"
const {WeekPicker} = DatePicker
const Search = Input.Search
import debounce from 'dvax/debounce'
const SearchRow = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content:space-between;
    alignItems:start;
`
function Header(props){
    return (
        <div>
            <SearchRow>          
                <div style={{display:'flex'}}>
                    <MapSelectProvinces />
                    <div style={{width:20}}></div>
                    <MapSelectCities />
                    <div style={{width:20}}></div>
                    <Areas />
                </div>
                <DatePicker.RangePicker value={props.dateRange} onChange={dates=>{
                    Model.run('schedule',function*({fetch,get,change,put}){
                        yield change('dateRange',dates)
                        yield put({type:`getData`})
                    })
                }}/>
            </SearchRow>

            <SearchRow>   
                <div style={{display:'flex'}}>
                    <Select 
                        onSelect={value=>{
                            Model.run('schedule',function*({fetch,get,change,put}){
                                yield change('query.courseLabelId',value)
                                yield put({type:`getData`})
                            })
                        }}
                        placeholder={'请选择课程标签'}
                        style={{width:'200px'}}
                    >
                        {props.tags && props.tags.map((el,ind)=>{
                            return (
                                <Select.Option key={ind} value={el.courseLabelId}>{el.courseLabel}</Select.Option>
                            )
                        })||null}
                    </Select>
                    <div style={{width:20}}></div>

                    <Search
                        type="text"
                        placeholder="请输入课程名称"
                        onSearch={value=>{
                            Model.run('schedule',function*({fetch,get,change,put}){
                                yield change('query.courseName',value)
                                yield put({type:`getData`})
                            })
                        }}
                        style={{width:'300px'}}  
                        onChange={e=>{
                            if(e.target.value==='') {
                                Model.run('schedule',function*({fetch,get,change,put}){
                                    yield change('query.courseName','')
                                    yield put({type:`getData`})
                                })
                            }
                        }}                   
                    />
                    <div style={{width:20}}></div>

                    <Search
                        type="text"
                        placeholder="请输入老师名称"
                        onSearch={value=>{
                            Model.run('schedule',function*({fetch,get,change,put}){
                                yield change('query.teacherName',value)
                                yield put({type:`getData`})
                            })
                        }}
                        style={{width:'300px'}}  
                        onChange={e=>{
                            if(e.target.value==='') {
                                Model.run('schedule',function*({fetch,get,change,put}){
                                    yield change('query.teacherName','')
                                    yield put({type:`getData`})
                                })
                            }
                        }}                   
                    />       
                </div>
                <div style={{width:20}}></div>

            </SearchRow>
        </div>
    ) 
}
export default Model.connect('commonData')(Header)
