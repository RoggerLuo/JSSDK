import React from 'react'
import { Model } from 'dvax'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';


function Searchcheckpost(props){
    return (
            <div>
              <SearchBar placeholder="搜索"
              			 maxLength={8} 
              			 onSubmit={(value)=>{
              			 		
              			 		Model.change('searchCheckPostModel','query.searchValue',value)
				              	Model.dispatch({type:'searchCheckPostModel/getSearch'})  				                         						
						              }}
						 onChange={(value)=>{
		                    if(value=='') {
		                        Model.change('searchCheckPostModel','query.searchValue',value)
		                        Model.dispatch({type:'searchCheckPostModel/getSearch'})
		                       	Model.dispatch({type:'searchCheckPostModel/SearchHistory'})
		                    }
		                }}  
              />
             
          </div>
          );
}

export default Searchcheckpost
