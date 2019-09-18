import React from 'react'
import emptyPng from './empty.png'

function Empty(){
    return <div style={{margin:'auto',textAlign:'center',userSelect:'none'}}>
        <img src={emptyPng} style={{width:'70px'}}/>
        <div style={{marginTop:'10px',color:'#999999',fontSize:'14px'}}>空空如是</div>
    </div>
}

const comp = <Empty />
export default comp 
