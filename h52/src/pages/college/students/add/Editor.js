import {Model} from 'dvax'
import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'

import {redirect,getQuery} from 'components/history'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import {
    Editor
} from 'react-draft-wysiwyg'

import { Modal, Button } from 'antd'
class EditorComponent extends React.Component {
    constructor(props){
        super(props)
        // let editorState = EditorState.createEmpty()        
        // this.state = { visible: false,editorState}
    } 
    componentDidMount(){
        if(!this.props.match.params.schoolStudentId) return 
        const schoolStudentId = this.props.match.params.schoolStudentId 
        Model.run('collegeStudents2',function*({fetch,reduce,change}){  
          debugger
          const res = yield fetch(`school-students/${schoolStudentId}`)
           // res.data.birthday = new Date(res.data.birthday).format("yyyy-MM-dd")
            debugger
          if(res.data.birthday==null){
             res.data.birthday=moment(0).format('YYYY-MM-DD')
          }
          else { res.data.birthday=moment(res.data.birthday).format('YYYY-MM-DD') }
          
          const schoolstudentList = res.data
           
          // schoolstudentList.birthday=moment(schoolstudentList.birthday)
          // schoolstudentList.enrollmentYear=moment(schoolstudentList.enrollmentYear)
          console.log('schoolstudentList',schoolstudentList)
          yield reduce(state=>({...schoolstudentList}))
          yield change('isEdit',true)
        })
    }

    render() {
      return (
        <div>
          
        </div>
      )
    }
  }
  export default withRouter(EditorComponent)
