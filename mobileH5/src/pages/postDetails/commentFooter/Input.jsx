import React from 'react'
import toast from 'dvax/toast'
import AdaptiveTextarea from './AdaptiveTextarea'
import styled from 'styled-components'
const FooterComp = styled.div`
    display: flex;
    flex:1;
`
const textareaStyle = {
    "WebkitAppearance":"none",
    "padding":"6px 10px",
    "width":"100%",
    "height":"22px",
    lineHeight:'24px',
    "backgroundColor":"#f6f7f9",
    "border":"1px solid #e8e8e8",
    "borderRadius":"25px",
    fontSize:'14px'
}
function Footer({ change, inputText}) {
    const onChange = (e) => {
        if(e.target.value.length>=100) {
            toast('评论不能大于300个字',1000)
            return
        }
        change('inputText',e.target.value)
    }
    return (
        <FooterComp>
            <AdaptiveTextarea
                style={textareaStyle}
                type={'text'}
                placeholder={'写评论...'}
                value={inputText||''}
                onChange={onChange}
                onFocus={e=>{}}
                
            />            
        </FooterComp> 
    )
}
export default Footer
