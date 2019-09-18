import React from "react"
import RouteElement from './RouteElement'
import { withRouter } from 'react-router'
import {Model} from 'dvax'
function toggle(route,event){
    if(Model.get('router').currentRoutePath===route.path) {
        Model.change('router','currentRoutePath',null)
    }else{
        Model.change('router','currentRoutePath',route.path)
    }
    if(event && event.stopPropagation) {
        event.stopPropagation()
    }
}
function _PrimaryRoute({ currentRoutePath, route, history }){
    function goRoute(route) {
        if (route.notNeedRoute) {
            toggle(route)
            return
        }
        if(Model.get('history').current === route.path)  return
        history.push(route.path)
        Model.change('history','current',route.path)
    }   
    const params = {goRoute,toggle} 
    return (
        <div style={animationEffect(route,currentRoutePath)}>
            <RouteElement {...params} route={route}/>
            {(function(){
                if(!route.subRoutes) return null
                return route.subRoutes.filter(el=>el.isShowInAside).map((route, i) => {
                    return (<RouteElement {...params} route={route} key={i} isChild={true}/>)
                })            
            })()}
        </div>
    )
}
const PrimaryRoute = Model.connect('router')(withRouter(_PrimaryRoute))
function animationEffect(route,currentRoutePath){ 
    let unfoldHeight = 50 
    if(currentRoutePath === route.path) { 
        if(route.subRoutes) {
            const subRoutesLength = route.subRoutes.filter(el=>el.isShowInAside).length
            unfoldHeight += subRoutesLength*46
        }
    }
    return {height:unfoldHeight,transition: 'all .2s ease-out',overflow:'hidden'}
}

export default PrimaryRoute