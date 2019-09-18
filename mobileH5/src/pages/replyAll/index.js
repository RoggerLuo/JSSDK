import render from 'shared/render.js'
import ReplyAll from './reply.js'
import Footer from './footer'
import './replyModel.js'
// import './style.css'

export default query => {
	// alert(query.index)
	render(ReplyAll,'Replyall')	
	render(Footer,'commentFooter')
}
