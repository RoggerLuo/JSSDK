import dvax,{ Model } from 'dvax'
import { render } from 'react-dom'
import React from 'react'
function renderApp(App,className){
    if(className) { // className表示有多个react应用
        const els = document.getElementsByClassName(className)
        const el = els[els.length-1]
        render(dvax.start(<App/>),el)
    }else{
        render(
            dvax.start(<App/>),
            document.getElementById('root')
        )    
    }
}
export default renderApp
