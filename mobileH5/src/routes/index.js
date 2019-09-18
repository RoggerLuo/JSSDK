import React from 'react'
import { Route,Switch,Redirect } from "react-router-dom"

import Constants from 'utils/constants'
import IndexPage from 'pages/indexPage'
import LoginPage from 'pages/loginPage'

import SectorComponent from 'pages/subject/sector' 

function Routes() {
  return (
      <Switch>
        
        <Route path="/" component={SectorComponent}/>
        <Route path="/login" component={LoginPage} />
      </Switch>
  )
}

export default Routes

{/* <Route path="/" exact render={() => (<Redirect to={'/login'} />)} /> */}