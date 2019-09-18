import render from 'shared/render.js'
import PostDetails from './postDetails.js'
import Footer from './commentFooter'
import './postdetailsModel.js'
// import './style.css'

export default query => {
	// alert(query.index)
    render(PostDetails,'postDetails')	
    render(Footer,'commentFooter')
}
