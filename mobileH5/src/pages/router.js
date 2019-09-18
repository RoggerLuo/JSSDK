import manage from './manage' // +
import BannedUsersAdd from './bannedUsersAdd'
import BannedUsers from './bannedUsers'
import PostManage from './post'
import PostDetails from './postDetails'
import ReplyAll from './Replyall'
import SectorComponent from './subject/sectors'
import SectorList from './sectorList'
import SendPost from './sendPost'
import Message from './message'
import Personal from './mine'
import SearchPost from './selectPost'
import CheckPost from './check'
import SearchCheckPost from './selectCheckPost'
export default function({name,query}){
    if(name==='manage') {    // +
    	manage(query)
        //render(manage,name)  // +
    }
    if(name==='bannedUsers') {    // +
    	BannedUsers(query)
      
    } 
    if(name==='bannedUsersAdd') {    // +
    	BannedUsersAdd(query)
      
    }
     if(name==='post') {    // +
    	PostManage(query)
      
    }
    if(name==='postDetails') {    // +
    	PostDetails(query)
      
    }
    if(name==='Replyall') {    // +
    	ReplyAll(query)
      
    } 
    if(name==='sectors') {    // +
    	SectorComponent(query)
      
    }
    if(name==='sectorsList') {    // +
    	SectorList(query)
      
    }
    if(name==='sendpost'){
    	SendPost(query)
    }
    if(name==='message'){
    	Message(query)
    } 
    if(name==='mine'){
    	Message(query)
    } 
     if(name==='selectPost'){
    	SearchPost(query)
    }
    if(name==='check'){
    	CheckPost(query)
    } 
    if(name==='selectcheckPost'){
    	SearchCheckPost(query)
    }                                           // +
 
}
