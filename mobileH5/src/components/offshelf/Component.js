import invariant from 'invariant'
import React from 'react'
import Fade from 'dvax/fade.js'
import okPng from './ok.png'
import notOkPng from './notok.png'
import { connect } from 'react-redux'

const wrapStyle={
    userSelect: 'none',
    position: 'fixed',
    zIndex: '99999',
    top: '50%',
    left:'50%',
    transform: 'translate(-50%,-50%)'
}

const contentStyle = {
    minWidth: '90px',
    textAlign: 'center',
    padding: '25px',
    borderRadius: '4px',
    backgroundColor: '#333333e6',
    backgroundColor: 'rgba(51, 51, 51, 0.9)',
    color: 'white',
    fontSize: '14px',
    lineHeight: '1.5'
}

export default connect(state => state['dvaxToast_offshelf'])(props=>{
    return (
        <div>
            {props.show?<div style={{position:'fixed',top:0,bottom:0,left:0,right:0}}></div>:null}
            <Fade duration={300} show={props.show} style={wrapStyle}>
                <div style={contentStyle}>
                    <div>
                        {props.status=='good'?(<img src={okPng} style={{marginBottom:'10px',width:'40px'}}/>):null}
                        {props.status=='bad'?(<img src={notOkPng} style={{marginBottom:'10px',width:'40px'}}/>):null}
                    </div>
                    {props.message}
                </div>
            </Fade>
        </div>
    )
})
