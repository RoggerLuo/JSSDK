import 'whatwg-fetch'
import "regenerator-runtime/runtime"
import 'es6-promise/auto'
import 'assets/style/index.less'
import React from 'react'
import { render } from 'react-dom'
import dvax from 'dvax'
import Fetch from 'dvax/fetch'
import { HashRouter as Router } from 'react-router-dom'
import Routes from './routes'
import History, {redirect} from 'components/history'
import {message} from 'antd'
let repeatProof = false
let api 
if(process.env.NODE_ENV==='production') {
    api = '/bbs/'
    // api = '/v1'
}else{
    api = '/bbs/'
}
export  {api}
const fetch = Fetch({ 
    baseUrl: api, 
    headers: {
        "Content-Type": "application/json",
    },
    requestBody(body){
        return JSON.stringify(body)
    },
    receiveData(res){
        if(res.httpStatus === 401){
            if(!repeatProof) {
                repeatProof = true
                message.warning('尚未登陆或登陆过期，正在跳转登陆页...')
                setTimeout(()=>{
                    redirect('/login')
                    repeatProof = false
                },2000) 
            }
            return {status:'error'}
        }
        if(res.httpStatus === 404){
            message.warning('404 not found')
            return {status:'error'}
        }
        return res
        // 没登陆的要在此控制
        if(res.status === 'error') {
            if(res.errorCode === "401") {
                message.warning('尚未登陆或登陆过期，正在跳转登陆页...')
                setTimeout(()=>redirect('/login'),3000)
                return res
            }
            return 
            //message.warning('接口错误')
        }
        return res.results
    }
})

dvax.config({effects:{fetch}})
const App = (
    <Router>
        <div style={{height:'100%'}}>
            <Routes/>
            <History/>
        </div>
    </Router>
)
const DvaxApp = dvax.start(App)
render(DvaxApp,document.getElementById('root'))

/* 
upload()
function upload( formData) {
    return new Promise(resolve => {
        const option = {url: 'medias'} 
        const xhr = new XMLHttpRequest()
        // if(option.maxSize &&  input.files[0].size > option.maxSize * 1024 * 1024){
        //         content: '请上传小于'+option.maxSize+'M的文件',
        // }
        xhr.open('post', option.url);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function(){
            if(xhr.status == 200){
                if(xhr.readyState == 4){
                    console.log('success upload')
                    resolve(JSON.parse(xhr.responseText))
                }
            }else{
                console.log('success failed')
            }
        }
        xhr.upload.onprogress = function(event){}
        xhr.send(formData)
    })
} */