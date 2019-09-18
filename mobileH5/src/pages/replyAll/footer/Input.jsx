import React from 'react'
import toast from 'dvax/toast'
import AdaptiveTextarea from './AdaptiveTextarea'
import styled from 'styled-components'
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
const prompt = Modal.prompt;
import IosInput from './iosInput.js'
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
function Footer({ change, inputText,replyedName,placeholderValue}) {
    //console.log('placeholderValue',placeholderValue)
    // const InputText=''
    // function Inputs(InputText){
    //     if(replyedName==''){
    //         return InputText
    //     }

    //     else return InputText='回复'+replyedName+':'
    // }
    
    const onChange = (e) => {
        if(e.target.value.length>=100) {
            toast('评论不能大于300个字',1000)
            return
        }
       // debugger
        const  inputTexts=e.target.value
        //const inputs=inputTexts.substring(6)
        change('inputText',inputTexts)
        change('placeholderValue','写评论...')
    }


   return (
        <FooterComp >
            <AdaptiveTextarea
                style={textareaStyle}
                type={'text'}
                placeholder={placeholderValue}
                value={inputText||''}
                onChange={onChange}
                onFocus={e=>{
                    e.preventDefault()
                }}
                onBlur={e=>{}}
                
            />            
        </FooterComp> 
    )
}
export default Footer
