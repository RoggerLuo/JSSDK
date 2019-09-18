import React from "react";
import styles from './index.less';
import {Model} from 'dvax'
import { Input } from 'antd';

const  Searches= Input.Search;
class Search extends React.Component {
    // onChange(value){
    //  if(value==null)
    //     Model.dispatch({type:'collegeStudents/getCollege'})
    // }
    render(){
      return(
        <div className={styles.search}>
          <Searches
            type="text"
            placeholder="请输入学生姓名/全拼/简拼"
            onSearch={(value)=>Model.dispatch({type:'collegeStudents/inputSearch',inputValue:value})}
            onChange={e=>{
                        if(e.target.value==='') {
                            Model.dispatch({type:'collegeStudents/getCollege',value:''})
                        }
                    }}    
          />
        </div>

        );
    }
}

export default Search;



