import React from 'react'
import { Model } from 'dvax'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';


function Search({data,...props}){
	console.log('1111',data.query.searchValue)
    return (
            <div>
              <SearchBar placeholder="搜索"
              			 maxLength={8} 
              			 //value={props.query.}
              			 onSubmit={(value)=>{
              			 		Model.change('searchModel','query.searchValue',value)
				              	Model.dispatch({type:'searchModel/getSearch'})
				              	Model.dispatch({type:'sectors/getSector'})
						              }}
						 onChange={(value)=>{
		                    if(value=='') {
		                        Model.change('searchModel','query.searchValue',value)
		                        Model.dispatch({type:'searchModel/getSearch'})
		                       	Model.dispatch({type:'searchModel/SearchHistory'})
			              		Model.dispatch({type:'sectors/getSector'})
		                    }

		                }} 
              />
             
          </div>
          );
}

export default Search
