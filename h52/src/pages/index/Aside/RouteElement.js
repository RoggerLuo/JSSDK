import React from "react"
import styled from 'styled-components'
import getIconStyles from './icon.less'
import trianglePng from 'assets/images/triangle-down.png'
import {Model} from "dvax"
const RouteText = styled.div`
    width: 100%;
    height: 50px;
    padding-left: 50px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #8e959b;
    text-decoration: none;
    position: relative;
    &:hover {
        background: #1e2343;
        color: white;
    }
    :before{
        content: '';
        width: 14px;
        height: 14px;
        position: absolute;
        top: e(calc('50% - 7px'));
        left: 25px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
`
const NoSelect = styled.span`
    user-select:none;
`
function state2style(route,activePath,isChild){ // 状态to样式
    let style = {}
    if(activePath.indexOf(route.path) !== -1) {
        style = { background: '#1e2343',color: 'white' }
        if(route.notNeedRoute) {
            style = { color: 'white' }            
        }
    }
    if(isChild){
        style = {...style,height: '46px',fontSize: '12px',background: '#252b4d'}        
    }
    return style
}

function RouteElement({current,route,goRoute,isChild,toggle}){
    const activePath = current
    return (
        <RouteText
            onClick={()=>goRoute(route)} 
            className={getIconStyles[route.name]}
            style={state2style(route,activePath,isChild)}
        >
            {route.title} 
            {route.subRoutes && route.subRoutes.filter(el=>el.isShowInAside).length?
                (
                    <NoSelect onClick={e=>toggle(route,e)}>
                        &nbsp;&nbsp;
                        <img src={trianglePng} width="9"/>
                        &nbsp;&nbsp;
                    </NoSelect>
                )
                :null
            }
        </RouteText>
    )
}
export default Model.connect('history')(RouteElement)
