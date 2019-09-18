import React from "react"
import { Model } from 'dvax'
import { message } from 'antd'
import Form from './Forms';
import {redirect} from 'components/history'
Model.create({
  namespace: 'collegeSchoolinfo1',
  state: {
  }
})
function CollegeSchoolinfo(props){
    function submit(value){
        const body = {...value}
        Model.run('collegeSchoolinfo1',function*({fetch,get}){
            body.images = get().images
                .filter(el=>el.response)
                .filter(el=>el.response.data)
                .map(el=>{
                    return el.response.data.media.mediaId
                })

            const res = yield fetch(`school-info`,{method:'post',body})
            if(res.hasErrors) return
            message.success('添加成功')
            redirect('/home/college/schoolinfo')
        })
    }
    return (
        <Form submit={submit}/>
    ) 
}
const CollegeSchooinfos=Model.connect('collegeSchoolinfo')(CollegeSchoolinfo)
export default Model.connect('collegeSchoolinfo1')(CollegeSchooinfos)
