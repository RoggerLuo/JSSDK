import React from "react"
import styled from 'styled-components'
import ParentsDatepicker from 'components/datepicker/parentsdate'
import Search from 'components/search/orderSearch'
import {Select} from 'antd'
import {Model} from 'dvax'
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

const states = [
    'PAYING', 'PRE_PAYMENT', 'PAID', 'REFUND', 'CANCEL_ORDER', 'EXPIRED_ORDER'
]
const statesMap = {
    'PAYING':'正在付款', 'PRE_PAYMENT':'预付款', 'PAID':'交易成功', 'REFUND':'已退款', 'CANCEL_ORDER':'取消订单', 'EXPIRED_ORDER':'订单过期'   
}
function Header(props){
    return (
        <div>
            <SearchRow>  
                <ParentsDatepicker onChange={()=>{}} />                  
                <div>
                    <Select 
                        onSelect={value=>{
                            Model.run('dealOrder',function*({fetch,get,change,put}){
                                yield change('pagination.payState',value)
                                yield put({type:`getDeal`})
                            })
                        }}
                        placeholder={'订单状态'}
                        style={{width:'200px'}}
                    >
                        {states.map((el,ind)=>{
                            return (
                                <Select.Option key={ind} value={el}>{statesMap[el]}</Select.Option>
                            )
                        })||null}
                    </Select>
                </div>
                <Search />
                <AddButton>导出</AddButton>
            </SearchRow>
        </div>
    ) 
}
export default Header
