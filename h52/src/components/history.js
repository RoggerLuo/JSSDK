import React from 'react'
import { Model } from 'dvax'
import { withRouter } from 'react-router-dom'
Model.create({
    namespace:'history',
    state:{
        history: {push(){}},
        current:'',
    },
    effects:{
        *redirect({change,get},{path}){
            get().history.push(path)
            yield change('current',path)
            // Model.change('commonData','query.schoolAreaId','')
            // Model.change('commonData','query.cityId','')            
        }
    }
})
class History extends React.Component { 
    constructor(props) {
        super(props)
        props.change('history',props.history)
        props.change('location',props.location)
    }
    componentDidMount(){
        this.props.change('current',this.props.location.pathname)
        Model.change('router','currentRoutePath',this.props.location.pathname.split('/').slice(0,3).join('/'))
    }
    render() {
        return <div></div>
    }
}   
export default Model.connect('history')(withRouter(History))
export function redirect(path){ // 可以加入参数来区分 是返回 还是切换大类
    Model.dispatch({type:'history/redirect',path})
}
export function getQuery(){
    return Model.get('history').location
}