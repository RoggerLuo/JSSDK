import {Model} from 'dvax'
import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {withRouter} from 'react-router-dom'
class EditorComponent extends React.Component {
    constructor(props){
        super(props)
    } 
    componentDidMount(){
        Model.dispatch({type:'collegeSchoolarea/getCollege'})

        if(!this.props.match.params.schoolInfoId) return 
        const schoolInfoId = this.props.match.params.schoolInfoId
        Model.run('collegeSchoolinfo2',function*({fetch,reduce,change}){
          const res = yield fetch(`school-info/${schoolInfoId}`)           
            const schoolinfoList = {...res.data}

            if(schoolinfoList.images) {
                schoolinfoList.images = schoolinfoList.images.map(el=>{
                    return {
                        uid:el,
                        name:el+'.png',
                        status:'done',
                        response:{data:{media:{mediaId:el}}},
                        thumbUrl:`/medias/${el}`
                    }
                })    
            }else{
                schoolinfoList.images = []
            }

            
            yield reduce(state=>({...schoolinfoList}))
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
