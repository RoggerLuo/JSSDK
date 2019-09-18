import Fetch from 'dvax/fetch'
import toast from 'dvax/toast'
import config from './config'
export default Fetch({ 
    baseUrl: config.api,//process.env.NODE_ENV === 'production'?config.api:'/', 
    headers: {
        "from": "client",
        "Content-Type": "application/json",
    },
    requestBody(data){
        return JSON.stringify(data)
    },
    receiveData(res){
        if(res.errorCode===20002||res.errorCode===30003){
            toast(`内容含有敏感词`, 2000, 'bad')
            return false
        }
        if (res.error) {
            toast(`${res.message}`, 2000, 'bad')
            return false
        }
        if (res.status === 'ok') {
            return res.results
        }else{
            toast(`接口出错`, 2000, 'bad')
            return false
        }
    }
})

