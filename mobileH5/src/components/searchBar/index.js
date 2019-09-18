import React from 'react'
import searchPng from './search.png'
import styled from 'styled-components'
import inputx from 'dvax/inputx'
import { Model } from 'dvax'
import randomString from 'dvax/randomString'
import cb from './cb'
const Input = styled.input`
    -webkit-appearance:none;
    outline:none;
    border:none;
    background-color: #f6f7f9;
    width:83%;
    font-size:14px;
    font-family: sans-serif;
    margin-top: 3px;
`
const Img = styled.img`
    padding-right:7px;
    padding-left:10px;
    margin:auto 0px;
    width:17px;
    height:17px;
`
const Panel = styled.div`
    position:fixed;
    top:101px;
    bottom:0px;
    left:0px;
    right:0px;
    background-color:white;
    z-index:11;
    overflow:auto;
`
const Cancel = styled.div`
    margin: auto;
    font-size: 14px;
    margin-right: 15px;
    cursor:pointer;
    width:45px;
    word-break: keep-all;
`
const HeaderWrapper = styled.div`
    border-bottom:1px solid #f6f7f9;
    background-color:white;
    height:56px;
    width:100%;
    user-select:none;
    display:flex;
`
const InputWrapper = styled.div`
    margin:auto 16px;
    display:flex;
    flex: 1;
    height: 36px;
    border-radius: 6px;
    background-color: #f6f7f9;
`
const namespace = `searchBar${randomString()}`
Model.create({namespace,state:{input:'',showPanel:false,data:[]}})
const SearchInput = inputx(namespace,Input)
function Header({ showPanel,run,change, ...props }){
    const close = () => change('showPanel',false)
    return (
        <HeaderWrapper>
            <InputWrapper>
                <Img src={searchPng} />
                <SearchInput fieldName={'input'} callback={cb(props.callback,run)} placeholder={props.placeholder}/>
            </InputWrapper>
            {showPanel?(<Cancel onClick={close}>取消</Cancel>):null}
            {showPanel?(<Panel onClick={close}>{props.getContent&&props.getContent(close)||''}</Panel>):null}
        </HeaderWrapper>
    )
}
export default Model.connect(namespace)(Header)

