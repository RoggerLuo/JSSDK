import {Model} from 'dvax'
import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {withRouter} from 'react-router-dom'
import moment from 'moment'

import { Modal, Button } from 'antd'
class EditorComponent extends React.Component {
      constructor(props){
        super(props)
    } 
    componentDidMount(){
        Model.dispatch({type:'roleSelect/getRole'})
        Model.dispatch({type:'collegeSchoolinfo/getCollege'})
        Model.dispatch({type:'collegeSchoolarea/getCollege'})
        const self = this
        if(!this.props.match.params.platformTeacherId) return 
           
        const platformTeacherId = this.props.match.params.platformTeacherId //this.props.location.search.slice(14)
        Model.run('userPlatform2',function*({fetch,reduce,change}){
               
          const res = yield fetch(`user-platformteacher/${platformTeacherId}`)
           
            const platformList = res.data
            console.log('platformList',platformList)
            
            yield reduce(state=>({...platformList}))
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
