import React from 'react'
import { Route,Switch,Redirect } from "react-router-dom"
import IndexPage from 'pages/index'
import LoginPage from 'pages/login'
/* 手动import: 路由侧栏的icon在 "indexPage/Aside/icon.less"中修改 */
function Routes() {
  return (
      <Switch>
        <Route path="/" exact render={() => (<Redirect to={'/login'} />)} />
        <Route path="/home" component={IndexPage}/>
        <Route path="/login" component={LoginPage} />
      </Switch>
  )
}

export default Routes
