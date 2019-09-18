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
     Model.dispatch({type:'collegeSchoolinfo/getCollege'})
     Model.dispatch({type:'collegeClasses/getGrade'})

        const self = this
        if(!this.props.match.params.schoolClassesId) return       
        const schoolClassesId = this.props.match.params.schoolClassesId //this.props.location.search.slice(14)
        Model.run('collegeClasses2',function*({fetch,reduce,change}){
               
          const res = yield fetch(`school-classes/${schoolClassesId}`)
           
            const schoolclassesList = res.data
                
            console.log('schoolclassesList',schoolclassesList)
            
            yield reduce(state=>({...schoolclassesList}))
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
