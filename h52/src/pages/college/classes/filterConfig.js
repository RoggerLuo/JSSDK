
import React from "react"
import { Model } from 'dvax'
import { Table, Select } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'

const Option = Select.Option;

 const selectGrade = ({grade,...props }) => {
  const grades=grade.slice(0)
  grades.unshift({schoolGradeId:'',schoolGradeName:'全部'})
    return (
     
       <Select
        placeholder='请选择年级'
        //defaultValue={"全部"}
         style={{ width: 160 }}
         onDropdownVisibleChange={(open)=>Model.dispatch({type:'collegeClasses/getGrade'})}
       >
             {
                grades.map((pro,index)=>{
                    return <Option value={pro.schoolGradeName} key={index} onClick={()=>
                      { 
                       if(pro.schoolGradeName=='全部'){
                        Model.dispatch({type:'collegeClasses/getCollege'})
                      }
                      else{
                      Model.dispatch({type:'collegeClasses/getSelectGrade',selectValue:pro.schoolGradeId})
                      }
                      }
                      }>{pro.schoolGradeName}
                    </Option>                   
                })
            }              
       </Select>
    );
 //} 
}

const Grades=Model.connect('collegeClasses')(selectGrade)
export  default Grades