import React from "react"
import { routes } from 'src/routes/config'
import styles from './index.less';
import { withRouter } from 'react-router-dom'
import getRouteArr from './getRouteArr'
function _Guide({location,history}){
    const goRoute = route => {
        if(route.notNeedRoute) return
        history.push(route.path)
    }
    const routeArr = getRouteArr(location,routes)
    return (
        <div className={styles.routeName}>
            {routeArr.map((route,ind)=>{
                const isLastOne = ind === routeArr.length - 1                    
                if(isLastOne) {
                    return (
                        <span key={ind} className={styles.item+' '+styles.isLastOne}>
                            {route.title}
                        </span>
                    )
                }
                    return (
                        <span key={ind}>
                            <span className={styles.item} onClick={()=>{goRoute(route)}} >
                                {route.title}
                            </span>
                            <span className={styles.arrow}>&gt;</span>
                        </span>
                    )
            })}
        </div>
    )
}
export default withRouter(_Guide)
/* 
                if(ind ===0 ){
                    return (
                        <span key={ind} className={styles.item} >
                            {route.title}
                            <span className={styles.arrow}>&gt;</span>
                        </span>
                    )
                }
 */