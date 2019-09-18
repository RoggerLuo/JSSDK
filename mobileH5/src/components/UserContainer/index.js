import React from 'react'
import { Model } from 'dvax'
import toast from 'dvax/toast'
import avatarDefault from "./avatar.png"
import config from 'shared/config'
import invariant from 'invariant'
class AvatarStateComp extends React.Component { 
    constructor(props) {
        super(props)
        this.state = { src:avatarDefault, avatar:'' }
    }
    componentWillMount(){
        const userId = this.props.userId
        invariant(!!userId,'使用AvatarStateComp,userId是必须的')
        const self = this
        Model.run('whatever',function*({ fetch, get }){
            const res = yield fetch(`users/${userId}@lore`) //拉回来user信息，在求助列表使用，更新头像
            self.setState({ name:res.name })

            if(res.avatar) {
                const src = `${config.api}/medias/${res.avatar}?access_token=${get('wp').accessToken}&domain_id=lore`
                self.setState({ src, avatar:res.avatar })
            }
        })
    }
    render() {
        const Container = this.props.component
        return <Container {...this.props} name={this.state.name} src={this.state.src} avatar={this.state.avatar} /> //this.props.children({...this.props,src:this.state.src})
    }
}
export default AvatarStateComp
