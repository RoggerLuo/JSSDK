import { Model } from 'dvax'
import React from 'react'

class LikeButton extends React.Component {
    constructor (props) {
      super(props)
      this.state = { isLiked: false }
    }

    onClick () {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }

    render () {
      return (
        <div>
          <button>
            <span >${this.props.word || ''} ${this.state.isLiked ? '取消' : '点赞'}</span>
            <span>?</span>
          </button>
        </div>
        )
       
      
    }
  }

 export default LikeButton