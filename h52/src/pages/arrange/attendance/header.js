import React from "react"
import styled from 'styled-components'
import {Areas,MapSelectCities,MapSelectProvinces} from './filterConfig'
import {showModal} from './addModal'
import {DatePicker,Select,Input} from 'antd'
const Search = Input.Search
import moment from 'moment'
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
  background: #1890FF;
  cursor: pointer;
  width: 116px;
  height: 36px;
  margin-left:20px;
`

function Header(props){
    const tags = props.tags.slice()
    tags.unshift({courseLabel:'全部',courseLabelId:''})
    return (
        <div>
            <SearchRow>          
                <div style={{display:'flex'}}>
                <MapSelectProvinces />
                <div style={{width:20}}></div>
                <MapSelectCities />
                <div style={{width:20}}></div>
                <Areas />
                <div style={{width:20}}></div>
                <DatePicker.RangePicker value={props.dateRange} onChange={dates=>{
                        console.log(dates)
                        Model.run('attendance',function*({fetch,get,change,put}){
                            yield change('dateRange',dates)
                            yield put({type:`getData`})
                        })
                    }}/>
                </div>
                <AddButton onClick={showModal} > + 添加休假</AddButton>
            </SearchRow>
            <SearchRow>   
                <div style={{display:'flex'}}>
                    <Select 
                        onSelect={value=>{
                            Model.run('attendance',function*({fetch,get,change,put}){
                                yield change('query.courseLabelId',value)
                                yield put({type:`getData`})
                            })
                        }}
                        placeholder={'请选择课程标签'}
                        style={{width:'200px'}}
                    >
                        {tags.map((el,ind)=>{
                            return (
                                <Select.Option key={ind} value={el.courseLabelId}>{el.courseLabel}</Select.Option>
                            )
                        })||null}
                    </Select>
                    <div style={{width:20}}></div>
                    <Search
                        type="text"
                        placeholder="请输入老师名称"
                        onSearch={value=>{
                            Model.run('attendance',function*({fetch,get,change,put}){
                                yield change('query.teacherName',value)
                                yield put({type:`getData`})
                            })
                        }}
                        style={{width:'300px'}}  
                        onChange={e=>{
                            if(e.target.value==='') {
                                Model.run('attendance',function*({fetch,get,change,put}){
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
