import React from "react"
import { Model,connect } from 'dvax'
import { Table,message } from 'antd'
import Form from './EditForm';
import {redirect} from 'components/history'

Model.create({
  namespace: 'collegeSchoolinfo2',
  state: {
  }
})

function onPageChange(pageInfo){
    const currentPage = pageInfo.current
}
function openEdit({schoolInfoId}){
    redirect(`/home/college/schoolinfo/edit/${schoolInfoId}`)
    Model.change('collegeSchoolinfo2','isEdit',true)
    Model.change('collegeSchoolinfo2','schoolInfoId',schoolInfoId)
}


function CollegeSchoolinfo(props){
    function submit(value){
        const schoolInfoId=props.schoolInfoId
        const body = {schoolInfoId,...value}

        props.run(function*({fetch,get}){
            body.detail = get().detail
            body.images = get().images
                .filter(el=>el.response)
                .filter(el=>el.response.data)
                .map(el=>{
                    return el.response.data.media.mediaId
                })
            let res 
            res= yield fetch(`school-info/update`,{method:'post',body}) 
              if(res.hasErrors) return
            message.success('编辑成功')
            redirect('/home/college/schoolinfo')
            Model.dispatch({type:'collegeSchoolinfo/getCollege'})
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}

export default Model.connect('collegeSchoolinfo2')(CollegeSchoolinfo)
export{onPageChange,openEdit}
