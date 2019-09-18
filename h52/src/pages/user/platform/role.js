import { Select } from 'antd';
import React from "react";
import { connect,Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
const Option = Select.Option;
Model.create({
    namespace:'roleSelect',
    state:{
        roles:[]
    },
    effects:{
          *getRole({fetch,change}){ 
          
            const res = yield fetch(`user-roles/all`)
            //if(hasErrors) return
                
            console.log(res)           
            yield change('roles',res.data)         
        }
        }
 
})
const Role = ({roles,...props}) => {
    const rolesList=roles.slice(0)
    rolesList.unshift({roleId:'',roleName:'全部'})
    return (
          
        <Select
        placeholder='请选择职位'
        //allowClear={true}
          style={{ width: 150 }}
          onDropdownVisibleChange={(open)=>Model.dispatch({type:'roleSelect/getRole'})}
        >
          {
            rolesList.map((obj,index) =>{
            return  <Option key={index} onClick={()=> Model.dispatch({type:'userPlatform/searchRole',roleValue:obj.roleId})}>{obj.roleName}</Option>
        })
          }
        </Select>
      
    );
 //} 
}
const Roles=  Model.connect('roleSelect')(Role)
export default Model.connect('userPlatform')(Roles)

