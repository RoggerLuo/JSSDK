import './js/framework7.js'
import './css/framework7.ios.css'
export default function(router){
    const $ = Dom7
    const f7App = new Framework7({
        animateNavBackIcon: true,
        pushState: true,
        sortable: false
    })
    const mainView = f7App.addView('.view-main', {
        dynamicNavbar: true,
        domCache: true
    })
    $(document).on('pageBeforeInit', function (e) {
        const {name,query} = e.detail.page
        router({name,query})
    })
    $(document).on('pageBeforeRemove', function (e) {
        f7App.hideIndicator()
    })
    
    $(document).on('pageBack', function (e) {
        // $('.modal-overlay').removeClass('modal-overlay-visible')
        // $('.picker-modal').remove()            
    })
    document.addEventListener('deviceready', _listenAndroidBackButtonEvent, false);
    return { f7App, mainView, $ }   
    
    function _listenAndroidBackButtonEvent() {
        window.ANDROID_BACK_EVENT = null
        cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [true]);
        cordova.exec(e => {
            if (e.action !== 'backbutton') {
                return
            }
            if (typeof(window.ANDROID_BACK_EVENT) == 'function') {
                window.ANDROID_BACK_EVENT()
                window.ANDROID_BACK_EVENT = null
                return
            } 
            if (f7App.views[0].history.length == 1) {
                cordova.exec(
                    function () {},
                    function (err) {},
                    'WorkPlus_WebView',
                    'exit',
                    []
                )
            } else {
                window.mainView.router.back()
            }

        }, null, "CoreAndroid", "messageChannel", []);
    }
}

