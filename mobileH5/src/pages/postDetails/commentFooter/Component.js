import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import release from './release'
import {Model} from 'dvax'
import IosInput from './comIosInput.js'
const Footer = styled.div`
    box-shadow: 0 2px 6px #adadad;
    padding:10px 0;
    background-color:white;
    font-size: 12px;
    color: #333333;
    margin-bottom: 0px;
    display: flex;
    justify-content: space-between;
    position:absolute;
    bottom:0px;
    width:100%;
`
const Part1 = styled.div`
    display: flex;
    flex:3;
    padding-left:15px;
`
const Part2 = styled.div`
    display: flex;
    padding-right:15px;
`
const ReleaseButton = styled.div`
    color:#1a98ff;
    padding: 20px 0px 1px 20px;
    position: relative;
    bottom: 10px;
    font-size:14px;
`

function FooterComp(props) {
var browser = {
        versions: function() {
            var u = navigator.userAgent;
            return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
function changeHeaderStyle() {
        var obj = document.getElementById("header-css")
        obj.setAttribute("href","/assets/styles/android.css")
    }
    if(browser.versions.iPhone){
        return(
            <Footer >
                <Part1 style={{paddingLeft:'10px',paddingRight:"10px"}} >
                   <IosInput  />
                </Part1>
            </Footer>
            )                        
}
else   return (
        <Footer>
            <Part1>
                <Input {...props}/>
            </Part1>
            <Part2 onClick={e=>release(props.run)}>
                <ReleaseButton>发布</ReleaseButton>
            </Part2>
        </Footer>
    )
}

export default Model.connect('PostsDetailsModel')(FooterComp)