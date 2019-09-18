import init from './subject'
import f7init from 'shared/f7'
import router from './router'
const { f7App, mainView, $ } = f7init(router)
window.f7App = f7App
window.mainView = mainView
export default init

global.exitPage = () => {
    cordova.exec(
        function () {},
        function (err) {},
        'WorkPlus_WebView',
        'exit',
        []
    )
}
