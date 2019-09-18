import React from "react"
import styled from 'styled-components'
import { Model } from "dvax"
import Modal,{showModal} from './addModal'
const $ = Model.assign('sensitive')
import { Input, Select } from 'antd'
const Search = Input.Search

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
    return (
        <SearchRow>     
            <Search
                    type="text"
                    placeholder="请输入敏感词"
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
            <div style={{width:20}}></div>
            <AddButton onClick={()=>showModal(text=>{
                const arr = text.split('\n').map(el=>trim(el))
                
                $.run(function*({fetch,put}){
                    yield fetch(`sensitive`,{method:'post',body:{words:arr}})
                    yield put({type:'get'})
                })
            })} > + 添加词 </AddButton>
            <Modal/>
        </SearchRow>
    ) 
}
export default Model.connect(['sensitive'])(Header)



function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');
}


/**
* 删除左边的空格
*/
String.prototype.ltrim=function()
{
     return this.replace(/(^\s*)/g,'');
}
/**
* 删除右边的空格
*/
String.prototype.rtrim=function()
{
     return this.replace(/(\s*$)/g,'');
}

