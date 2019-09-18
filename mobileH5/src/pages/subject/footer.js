import React from 'react'
import { Model } from 'dvax'
import styled from 'styled-components'
import home from './shouye.png'
import sector from './bankuai.png'
import add from './tianjia.png'
import message from './xiaoxi.png'
import my from './wode.png'
import homeAfter from './shouyeAfter.png'
import sectorAfter from './bankuaiAfter.png'
import messageAfter from './xiaoxiAfter.png'
import myAfter from './wodeAfter.png'

const WrapDiv = styled.div`
   
    width:100%;
    display:flex;
    height:55px;
    justify-content: space-evenly;  
    background:#f6f6f6;
`
const Div = styled.div`
  	width: 40px;
	height: 100%;
	margin-top:4px;
	
 	 
`	
const Img = styled.img`
  width:100%;
  height:100%;
`
const DivImg = styled.div`
 	 width: 38px;
    height: 38px;
   
`
const Divtext = styled.div`
     font-size: 10px;
     width:38px;
     text-align:center;
     margin-top:-4px;
    
   
`
class Footer extends React.Component {
	componentDidMount() {
		Model.change('AddModals','visible',false)
		

	}


	render(){
		
		
    return (
    	<WrapDiv className='Box'>
    		{this.props.selected==0?
	    		<Div className='flex1' style={{textAlign: '-webkit-center'}}>
	    			<DivImg>
	    				<Img src={homeAfter} />
	    			</DivImg>	
					 
					 <Divtext style={{color:"#ffe300"}}>首页</Divtext>
	    		</Div>:
	    		<Div className='flex1' style={{textAlign: '-webkit-center'}}  onClick={()=>{
					 	Model.change('HomePageModel','selected',0)
					 	Model.dispatch({type:'HomePageModel/gethomePage'})
					 
					 }}>
	    			<DivImg>
	    			<Img src={home}/>
					 </DivImg>
				 	<Divtext style={{color:'#cbcbcb'}}>首页</Divtext>
	    		</Div>
    		}
    		{this.props.selected==1?
	    		<Div className='flex1' style={{textAlign: '-webkit-center'}}>
	    			<DivImg>
	    				<Img src={sectorAfter} />
		    		</DivImg>
		    		<Divtext style={{color:"#ffe300"}}>板块</Divtext>
	    		 </Div>:
	    		 <Div className='flex1' style={{textAlign: '-webkit-center'}} onClick={()=>{
			    			Model.change('HomePageModel','selected',1)
			    			Model.dispatch({ type: 'sectors/getSector' })
			    		}}>
	    		 	<DivImg>
	    		 		<Img src={sector} />
	    		 	</DivImg>
	    		 	<Divtext style={{color:'#cbcbcb'}}>板块</Divtext>
	    		 </Div>
    		}
    		<Div className='flex1'  style={{marginTop:'-18px',textAlign: '-webkit-center'}}>
	    		<DivImg style={{width:'45px',height:'45px'}}>
		    		<Img src={add} onClick={()=>{
		    			Model.change('AddModals','visible',true)
		    		}}
		    		/>
	    		</DivImg>
    		</Div>
    			<Div className='flex1' >
    			<div style={{width:'100%',height:"100%",textAlign:"-webkit-center",position:'relative'}}>
    				{
					this.props.messNumbers==0?<div></div>:<div>
						{
							this.props.messNumbers<100?<div>
								<div style={{width:'22px',height:'22px',borderRadius:'50%',textAlign:'center',
								lineHeight:'22px',background:'#ff3b30',position:'absolute',
								color:'#fff',fontSize:'10px',display:"inline",marginLeft:"10px"}}>								
									<div>{this.props.messNumbers}</div>								
								</div>
							</div>:<div>
								<div style={{width:'22px',height:'22px',borderRadius:'50%',textAlign:'center',
								lineHeight:'22px',background:'#ff3b30',position:'absolute',
								color:'#fff',fontSize:'10px',display:"inline",marginLeft:'10px'}}>
								{
								<div>99+</div>
								}
								</div>
							</div>
						}
					</div>
					
	    		}
	    		{
    				this.props.selected==2?
    				<div>
		    			<DivImg >
		    				 <Img src={messageAfter} />
		    			</DivImg>
		    			<Divtext style={{color:"#ffe300"}}>消息</Divtext>
	    			</div>:<div onClick={()=>{
    				Model.change('HomePageModel','selected',2)
    				Model.dispatch({type:'messageModel/getMessage'})
    				}}>
	    				<DivImg >
			    			<Img src={message}  /> 
			    		</DivImg>
			    		<Divtext style={{color:'#cbcbcb'}}>消息</Divtext>
	    			</div>
	    		}
	    		</div>
	    		</Div>
	    		{/*:
	    		<Div className='flex1' onClick={()=>{
    				Model.change('HomePageModel','selected',2)
    				Model.dispatch({type:'messageModel/getMessage'})
    				}}>
		    		<div style={{width:'100%',height:"100%",textAlign:"-webkit-center",position:'relative'}}>	
		    			{
						this.props.messNumbers==0?<div></div>:(
							this.props.messNumbers<100&&this.props.messNumbers>0?
		    			<div style={{width:'22px',height:'22px',borderRadius:'50%',textAlign:'center',
									lineHeight:'22px',background:'#ff3b30',position:'absolute',
									color:'#fff',fontSize:'10px',display:"inline",marginLeft:'10px'}}>
									{
										<div>{this.props.messNumbers}</div>
									}
						</div>:<div style={{width:'22px',height:'22px',borderRadius:'50%',textAlign:'center',
									lineHeight:'22px',background:'#ff3b30',position:'absolute',
									color:'#fff',fontSize:'10px',display:"inline",marginLeft:'10px'}}>
									{
									<div>99+</div>
									}
						</div>
						)					
		    			}	    		
		    			<DivImg >
			    			<Img src={message}  /> 
			    		</DivImg>
			    		<Divtext style={{color:'#cbcbcb'}}>消息</Divtext>
			    	</div>
	    		</Div>	 */}   		   			
    		
    		{
    			this.props.selected==3?
    			<Div className='flex1' style={{textAlign: '-webkit-center'}}>
    				<DivImg>
	    		 		<Img src={myAfter} />
    		 		</DivImg>
    		 		<Divtext style={{color:"#ffe300"}}>我的</Divtext>
		 		</Div>:
		 		<Div className='flex1' style={{textAlign: '-webkit-center'}} onClick={()=>{
		    				Model.change('HomePageModel','selected',3)
		    				Model.change('mineModel','mytabs','0')
		    			}} >
		 			<DivImg>
			 			<Img src={my}/>
		    		</DivImg>
		    		<Divtext style={{color:'#cbcbcb'}}>我的</Divtext>
		 		</Div>
	    		
    		
    		
    		}
			
    	</WrapDiv>
    ) 
    }
}
export default Model.connect(['AddModals','HomePageModel','messageModel','sectors'])(Footer) 



    	// this.props.messNumbers==0?<div></div>:(
					// 	this.props.messNumbers<100&&this.props.messNumbers>0?
	    // 			<div style={{width:'22px',height:'22px',borderRadius:'50%',textAlign:'center',
					// 			lineHeight:'22px',background:'#ff3b30',position:'absolute',
					// 			color:'#fff',fontSize:'10px',display:"inline",marginLeft:"10px"}}>
					// 			{
					// 				<div>{this.props.messNumbers}</div>
					// 			}
					// </div>:<div style={{width:'22px',height:'22px',borderRadius:'50%',textAlign:'center',
					// 			lineHeight:'22px',background:'#ff3b30',position:'absolute',
					// 			color:'#fff',fontSize:'10px',display:"inline",marginLeft:'10px'}}>
					// 			{
					// 			<div>99+</div>
					// 			}
					// </div>
					// )