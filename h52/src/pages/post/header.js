import React from "react"
import styled from 'styled-components'
import {openAddCategory} from './detail'
import { Input, Select } from 'antd'
import { Model } from "dvax"
// import { MapSelectProvinces, MapSelectCities } from './citySelect'
const Search = Input.Search
const $ = Model.assign('post')
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
                        $.put({type:'post/get'})
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
                
                <Select
                    onChange={(value)=>{ // onchange
                        $.change('query.auditStatus',value||'')
                        $.put({type:'post/get'})
                    }}
                    placeholder={'选择审核状态'} //placeholder
                    style={{ width: '150px' }}
                    allowClear
                >
                    {[{text:'不通过',value:'false'},{text:'通过',value:'true'}]  // data source
                        .map((el,ind)=>(
                            <Select.Option 
                                value={el.value}  // value key
                            key={ind}>
                                {el.text}       {/* text key */}
                            </Select.Option>
                        )
                    )}
                </Select>


                <div style={{width:20}}></div>

                
            </div>

            <Search
                    type="text"
                    placeholder="请输入帖子标题或内容"
                    onSearch={value=>{
                        Model.run('post',function*({fetch,get,change,put}){
                            yield change('text',value)
                            yield put({type:`get`})
                        })
                    }}
                    style={{width:'300px'}}  
                    onChange={e=>{
                        if(e.target.value==='') {
                            Model.run('post',function*({fetch,get,change,put}){
                                yield change('text','')
                                yield put({type:`get`})
                            })
                        }
                    }}                   
                />
        </SearchRow>
    ) 
}
export default Model.connect(['subject','post'])(Header)
