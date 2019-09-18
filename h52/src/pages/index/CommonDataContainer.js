import React from "react"
import { Model } from 'dvax'
import './commonDataModel'
import 'moment/locale/zh-cn'
class CommonDataContainer extends React.Component { 
    componentDidMount(){ 
        // Model.dispatch({type:'commonData/initialFetch'})
        // setTimeout(function(){
        //     Model.run('none',function*({fetch}){
        //         const res = yield fetch(`course-info`)
        //         console.log('polling every second')
        //     })    
        // },120000)
    }
    render() {
        return <div></div>
    }
}
export default CommonDataContainer
