import React from 'react'
import { Model } from 'dvax'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';


function Search(props){
	console.log('searchname',props)
    return (
            <div>
	          	<SearchBar	placeholder="用户搜索"
	          				maxLength={8} 
	          			 	//value={props.query.}
	          			 	onSubmit={(value)=>{
	          			 		Model.change('UsersAdd','query.searchValue',value)
				              	Model.dispatch({type:'UsersAdd/getSearchUsers'})
				              	}}
						 	onChange={(value)=>{
			                    if(value=='') {
			                        Model.change('UsersAdd','query.searchValue',value)
			                    }
			                }}  
              />
             
          </div>
          );
}

export default Search
