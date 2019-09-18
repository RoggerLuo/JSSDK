import React from "react"
import { Model } from 'dvax'
import {Modal,Button,Input} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import { Form, Select, message } from 'antd'
import moment  from "moment"
import {redirect} from 'components/history'
Model.create({
    namespace:'checkModal',
    state:{
    	visible:false,
        currentapplicationInfo:{},
    }
})
function showModal({refundApplicationId}){
        
    Model.dispatch({type:'dealApplication/refundCheck',refundApplicationId:refundApplicationId})
    Model.change('checkModal','visible',true)
    // Model.change('checkModal','currentapplicationInfo',record)
    

}
const Check =({visible,currentapplicationInfo,checkList,...props})=>{
    console.log('checkList',checkList)
    console.log("visible:",visible)
        
    const handleOk=()=>{ 

        if(currentapplicationInfo.refundFee > checkList.totalFee){
            message.warning('不支持输入比缴费金额更高的数字')
            return
        }


        Model.run('checkModal',function*({fetch,get,change}){
            const body={
                refundApplicationId:checkList.refundApplicationId,
                refundFee:get().currentapplicationInfo.refundFee
            }
            
            const res = yield fetch(`refund-applications/pass`,{method:'post',body})
            if(res.hasErrors) return
            message.success('审核成功')
            Model.change('checkModal','visible',false)

            Model.dispatch({type:'dealApplication/getDeal'})
        })
    }
    const handleCancel=()=>{
        Model.change('checkModal','visible',false)
    }
    function Footer(){
        return (
            <div>
                <Button onClick={handleCancel}>取消</Button>
                <Button type={'primary'} onClick={handleOk}>提交</Button>
            </div>
        )
    }
     return (
   
        <Modal

            title="审核"
            visible={visible}
            width={'60%'}
            footer={<Footer />}
        >
        <div>
            <Form_/>
           
        </div>
        </Modal>  
   
    ) 

}
const Checked= Model.connect('dealApplication')(Check)
export default Model.connect('checkModal')(Checked)
export {showModal}

