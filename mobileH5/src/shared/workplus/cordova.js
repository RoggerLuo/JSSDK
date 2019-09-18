// import { strToJson } from './tools';

export default {
    getAccessToken() {
        return new Promise(function(success, fail) {
            cordova.exec(
                success,
                fail,
                "WorkPlus_Auth",
                "getAccessToken", 
                []
            )
        })
    },
    getTicket() {
        return new Promise(function(success, fail) {
            cordova.exec(
                success,
                fail,
                'WorkPlus_Auth',
                'getUserTicket', [])
        })
    },
    getUserInfo() {
        return new Promise((success, fail) => {
            cordova.exec(
                success,
                fail,
                'WorkPlus_Contact',
                'getCurrentUserInfo', [{
                    'needEmpInfo': true
                }]
            )
        })
    },
    ready() {
        return new Promise((success, fail) => {
            document.addEventListener('deviceready', () => {
                success();
            });
        });
    },
    setRightButton(buttons) {
        this.emptyRightButton()
            .then(() => {
                cordova.exec(function(result){
                    console.log("设置按钮成功");
                },
                function (error) {
                    console.log("设置按钮失败:" + error);
                },
                "WorkPlus_WebView",
                "rightButtons",
                [buttons]);
            });
    },

    emptyRightButton() {
        return new Promise((success, fail) => cordova.exec(success, fail, "WorkPlus_WebView", "clearRightButtons", []));
    },

    changeTitle(title) {
        return new Promise((success, fail) => cordova.exec(success, fail, "WorkPlus_WebView", "title", [title]));
    },

    // getIpAddress() {
    //     return new Promise((success, fail) => cordova.exec((res) => {
    //         success(strToJson(res));
    //     }, fail, "WorkPlus_DeviceInfo", "getIpAddress", []));
    // },

    getAppInfo() {
        return new Promise((success, fail) => cordova.exec(success, fail, "WorkPlus_PublicClound", "getAppInfo", []));
    },

    getDeviceInfo() {
        return new Promise((success, fail) => cordova.exec(success, fail, "WorkPlus_DeviceInfo", "getDeviceInfo", []));
    },

    exit() {
        cordova.exec(function(result) {},
            function(error) {
                alert("调用失败:" + error);
            },
            "appStore",
            "exit", []);
    },
    openWebView(url,params){
        function transformQuery(query) {
            let queryStr = '?'
            for (let k in query) {
                if (query.hasOwnProperty(k)) {
                    queryStr += k
                    queryStr += '='
                    queryStr += query[k]
                    queryStr += '&'
                }
            }
            return queryStr.slice(0, -1)
        }
        cordova.exec(function(result) {
                alert(JSON.stringify(result, null, 4))
            },
            function(error) {
                alert("调用失败")
            },
            "WorkPlus_WebView",
            "openWebView", 
            [
                {
                    "url":url+transformQuery(params), 
                    "title":"打开网页的标题",
                    "use_android_webview": false, //是否使用 android 原生 webview 打开, 否则使用workplus 订制的 webview
                    "display_mode": "FULL_SCREEN"//全屏打开 webview(即不包含原生标题栏), 默认非全屏
                }
            ]
        )
    }
}