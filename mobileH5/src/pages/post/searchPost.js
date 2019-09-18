import React from 'react'
import { Model } from 'dvax'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

// Model.create({
//     namespace:'PostsManage',
//     state:{
    	
//     }
// })

function Search(props){
    return (
            <div>
              <SearchBar placeholder="Search" maxLength={8} />
             
          </div>
          );
}

export default Model.connect('PostsManage')(Search)
