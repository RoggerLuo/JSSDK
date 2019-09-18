import render from 'shared/render.js'
import App from './App'
import Model from './model'
import Footer from './footer'
import './style.css'

export default ()=>{render(App);
	render(Footer,"indexFooter")  //渲染组件第一个参数为组件
}
