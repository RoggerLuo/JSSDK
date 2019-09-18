import React from "react"
import styled from 'styled-components'
import { Input, Select } from 'antd'
const Search = Input.Search

import { Model } from "dvax"
// import { MapSelectProvinces, MapSelectCities } from './citySelect'
const $ = Model.assign('comment')
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
            <div style={{display:'flex',margin: 'auto 0'}}>
                
                <Select
                    onChange={(value)=>{ // onchange
                        $.change('query.subjectId',value||'')
                        $.put({type:'get'})
                    }}
                    placeholder={'选择板块'} //placeholder
                    style={{ width: '150px' }}
                    allowClear
                >
                    {props.subjects  // data source
                        .map((el,ind)=>(
                            <Select.Option 
                                value={el._id}  // value key
                            key={ind}>
                                {el.name}       {/* text key */}
                            </Select.Option>
                        )
                    )}
                </Select>
                <div style={{width:20}}></div>
            </div>
            <Search
                    type="text"
                    placeholder="输入评论内容"
                    onSearch={value=>{
                        $.run(function*({fetch,get,change,put}){
                            yield change('query.text',value)
                            yield put({type:`get`})
                        })
                    }}
                    style={{width:'300px'}}  
                    onChange={e=>{
                        if(e.target.value==='') {
                            $.run(function*({fetch,get,change,put}){
                                yield change('query.text','')
                                yield put({type:`get`})
                            })
                        }
                    }}                   
                />
        </SearchRow>
    ) 
}
export default Model.connect(['subject','post'])(Header)
