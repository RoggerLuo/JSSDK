import React from "react";
import styles from './index.less';
import {Model} from 'dvax'

import { Input } from 'antd';

const  Searches= Input.Search;
class Search extends React.Component {

    // onChange(value){
    //  if(value==null)
    //     Model.dispatch({type:'collegeSchoolinfo/getCollege'})
    // }
    render(){
      return(
        <div className={styles.search}>
          <Searches
            type="text"
            // width="1500px"
            // style={"1500px";}
            // className={styles.enter}
            //className={styles.icon}
            placeholder="请输入商品名称"
            onSearch={(value)=>Model.dispatch({type:'dealApplication/inputSearch',inputValue:value})}
            onChange={e=>{
                        if(e.target.value==='') {
                            Model.dispatch({type:'dealApplication/getDeal',value:''})
                        }
                    }}    
          />
        </div>

        );
    }
}
//            enterButton

export default Search;
// function(value, event)


