import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
// import pic from './2.jpg'
import Search from './searchPost.js'
// import './homePage.css'
import config from 'shared/config'
import homehuifu from './huifu.png'
import homezan from './zan.png'
import PostComponent from '../homePage/postComponent.js'
import moment from 'moment'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';
Model.create({
    namespace:'searchModel',
    state:{
    	searchList:[],
    	searchPost:[],
    	lists:[],
    	query:{
    		searchValue:''
    	},
    	values:''
    	
    },
    effects:{
    	*SearchHistory({change,fetch,get}){
    		const res=yield fetch(`search`)
    		yield change('searchList',res)
    	},
    	*getSearch({change,fetch,get}){
    		const query={
    			...get().query
    		}
    		const content = query.searchValue
    		//debugger
    		const res = yield fetch(`search`,{method:'post',body:{text:content}})
    		yield change('lists',res.data)

    	},
    }
})


class SearchPost extends React.Component{
	constructor(props) {
	    super(props);
	    const dataSource = new ListView.DataSource({  //这个dataSource有cloneWithRows方法
	      rowHasChanged: (row1, row2) => row1 !== row2,
	    });

	    this.pageNo = 0 //定义分页信息
	    this.state = {
	      dataSource,
	      refreshing: true,
	      isLoading: true,
	      hasMore: true
	    };
  	}
	componentDidMount() {
		Model.change('searchModel','query.searchValue','')
		Model.change('searchModel','lists',[])
		Model.dispatch({type:'searchModel/SearchHistory'})
		//

	}
	resetState = () => {
        const posts = Model.get('searchModel').searchPost
		this.setState({
			dataSource: this.state.dataSource.cloneWithRowss(posts),
	        refreshing: false,
	        isLoading: false,
	    });
	}
	render(){
		console.log('this.props',this.props)
		const searchList=this.props.lists
		console.log('searchList',searchList)
		const data=this.props
		  return (
			<div style={{background:'#ffffff',width:'100%',paddingBottom:"75px"}}>
				<div className={{width:'100%'}}>
					<Search data={data} />
				</div>
				{
					searchList.length=='0'?
					<div style={{color:'#cccccc',width:'90%',height:'auto',borderBottom:'1px solid #f1f0f2',display:'flex',marginTop:'10px',marginLeft:'5%',flexWrap: 'wrap'}}>
						{
							this.props.searchList.map((objs,ind)=>{
								return <div key={ind} style={{marginLeft:'20px',marginBottom:'10px'}} onClick={()=>{
									Model.change('searchModel','query.searchValue',objs.text)
									Model.dispatch({type:'searchModel/getSearch'})
								}}>
									{objs.text}
								</div>
							})
						}
					</div>:<div></div>
				}
				
			 	{

			 	 	searchList.map((obj,index)=>{
			 			obj.createTime=moment(obj.createTime).format("YYYY-MM-DD HH:mm:ss")
			 			return(
							<div className='post' key={index} style={{height:'auto',marginBottom:'10px'}}>
								<div className='title' style={{height:"60px",width:'90%',marginLeft:'5%'}}>
									<div className='pic' style={{width:'50px',height:'50px',marginLeft:'0px'}}>
										<img src={`${config.api}/medias/${obj.authorInfo.avatar}`} className='logo' style={{borderRadius:'50%'}} />
									</div>
									<div className='tip' style={{width:'80%'}}>
										<div className='name' style={{fontSize:'14px',height:'50%'}}>{obj.authorInfo.nickname}</div>
										{
											this.props.sectorList.map((sector,ind)=>{
												if(obj.subjectId==sector._id)
													return <div key={ind} className='time' style={{fontSize:'12px'}}>{sector.name}&nbsp;&nbsp;&nbsp;&nbsp;{obj.createTime}</div>
											})
										}
										
									</div>
								</div>
								<PostComponent key={index} rowData={obj} />
							</div>
						)
					 })
				}

			</div>
		)
		}
}

export default Model.connect(['searchModel','sectors'])(SearchPost) 