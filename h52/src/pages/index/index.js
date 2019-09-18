import React from "react"
import { Route, Switch } from 'react-router-dom'
import {routes} from 'src/routes/config'
import styles from './index.less'
import Header from './header'
import Aside from './Aside'
import { Model } from 'dvax'
import {LocaleProvider} from 'antd'
import './commonDataModel'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import CommonDataContainer from './CommonDataContainer'
function getRoute(route,key){
    return <Route key={key} path={route.path} component={route.component} exact />   
}
function IndexPage({ location }){
    return (
        <LocaleProvider locale={zh_CN}>
            <div className={styles.indexPage}>
                <Header/>
                <div className={styles.content}>                        
                    <Aside routes={routes}/>
                    <div className={styles.inner}>
                        <Switch>
                            {routes.map((route, i) => {
                                const arr = []
                                if(route.notNeedRoute !== true) {
                                    arr.push(getRoute(route,i))
                                }
                                if(route.subRoutes) {
                                    const subList = route.subRoutes.map(getRoute)
                                    arr.push(subList)
                                }
                                return arr
                            })}
                        </Switch>
                    </div>
                </div>
                <CommonDataContainer/>
            </div>
        </LocaleProvider>
    )
}
export default IndexPage
