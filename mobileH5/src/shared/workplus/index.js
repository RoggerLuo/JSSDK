import { Model } from 'dvax'
import api from './cordova'
import mockUserInfo from './mockUserInfo'
import mockToken from './mockToken'
Model.create({
    namespace: 'wp',
    state: {
        accessToken: ''
    }
})
export default function() { 
    return new Promise((resolve, reject) => {        
        if (isMobile()) {
            if (Model.get('wp').accessToken) {
                resolve(Model.get('wp'))
                return //如果已经获取了token，就不要重复验证了
            }
            document.addEventListener('deviceready', function() {
                Model.run('wp', function*({ call, change, fetch }) {
                    try {
                        const [
                            userInfo, 
                            { access_token },
                            { user_ticket } 
                        ] = yield [
                            call(api.getUserInfo), 
                            call(api.getAccessToken),
                            call(api.getTicket)
                        ]
                        yield change('accessToken', access_token)
                        yield change('userInfo', userInfo)
                        yield change('ticket', user_ticket)
                        resolve(Model.get('wp')) 
                    } catch (err) {
                        alert(`获取token失败:${err.message}`)
                    }
                })
            }, false)                
        }else{
            // Model.run('',function*({fetch}){
            //     const res = yield fetch(`auth/login`,{method:'post',body:params})
            //     debugger
            // })  


            // Model.change('wp','accessToken', mockToken)
            // Model.change('wp','userInfo', mockUserInfo)
            // resolve({ accessToken: mockToken, userInfo: mockUserInfo })
        }
    })
}

function isMobile() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true
    } else {
        return false
    }
}
