import React from "react";
import styles from './index.less';
import {Model} from 'dvax'
import { Input } from 'antd';

const  Searches= Input.Search;
class Search extends React.Component {
    // onChange(value){
    //  if(value==null)
    //     Model.dispatch({type:'userParents/getUser'})
    // }
    render(){
      return(
        <div className={styles.search}>
          <Searches
            type="text"
            style={{width:'500px'}}
            className={styles.search}
            placeholder="请输入帐号/手机/姓名/全拼/简拼/孩子姓名"
            onSearch={(value)=>Model.dispatch({type:'userParents/inputSearch',inputValue:value})}
            onChange={e=>{
                        if(e.target.value==='') {
                            Model.dispatch({type:'userParents/getUser',value:''})
                        }
                    }}    
          />
        </div>
        );
    }
}
export default Search;
// function(value, event)


