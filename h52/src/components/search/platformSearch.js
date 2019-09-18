import React from "react";
import styles from './index.less';
import {Model} from 'dvax'
import { Input } from 'antd';
import {redirect} from 'components/history'

const  Searches= Input.Search;
// class Search extends React.Component {
 // const  onChange=(value)=>{
 //     if(value==null)
 //        Model.dispatch({type:'userPlatform/getUser'})
 //       // redirect('/home/user/platform')
 //      }

            
const Search = ({placeholder,...props }) => {
      return(
        <div className={styles.search}>
          <Searches
            type="text"
            placeholder="请输入账号/姓名/全拼/简拼"
            onSearch={(value)=>{
              Model.dispatch({type:'userPlatform/inputSearch',inputValue:value})
               // redirect('/home/user/platform')
              // Model.dispatch({type:'userPlatform/getCollege'})
              
              }
            }
             onChange={e=>{
                        if(e.target.value==='') {
                            Model.dispatch({type:'userPlatform/getUser',value:''})
                        }
                    }}    
            
          />
        </div>

        );
   // }
}
const Srearched=Model.connect('selectFilter')(Search)
export default Srearched;


