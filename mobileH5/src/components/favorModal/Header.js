import React from 'react'
import { Model } from 'dvax'
// import s from './style.css'
import styled from 'styled-components'
const Header= styled.div`
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #333333;
`

function ModalHeader({ close }){
    const buttonStyle={outline:'none',userSelect:'none',padding:'3px 10px 3px 28px',fontSize:'12px',borderRadius: '6px',backgroundColor: '#f6f7f9',cursor:'pointer'}
    return (
        <div style={{borderRadius: '4px',textAlign:'center',padding:'10px 0 0 0'}}>
            <Header>收藏</Header>
        </div>
    )
}
export default ModalHeader
