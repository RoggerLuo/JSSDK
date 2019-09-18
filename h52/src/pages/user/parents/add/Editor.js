import {Model} from 'dvax'
import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
class EditorComponent extends React.Component {
    constructor(props){
        super(props)
    } 
    componentDidMount(){
       Model.dispatch({type:'roleSelect/getRole'})

        if(!this.props.match.params.householderId) return 
        const householderId = this.props.match.params.householderId
        Model.run('userParents2',function*({fetch,reduce,change}){
          const res = yield fetch(`user-householder/${householderId}`) 
                        
            const parentsList = {...res.data}


             parentsList.createTime = moment(parentsList.createTime)
            yield reduce(state=>({...parentsList}))
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
