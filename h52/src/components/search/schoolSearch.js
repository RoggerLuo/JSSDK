import React from "react";
import styles from './index.less';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
  }

 
  render() {
        
    return (
      <div className={styles.search}>
        <input ref="input" className={styles.input} type="text" placeholder="请输入账号/姓名/全拼/简拼"  />
       
        <i className={styles.icon}/>
      </div>
    );
  }
}
export default Search;
// 
// import {Input} from 'antd';
// import React from "react";
// import styles from './index.less';
// //const Search = Input.Search;
// class NewSearch extends React.Component {
//   constructor(props){
//     super(props);
//   }
  
//   render(){
//     return(
//       <div>
//         <div className={styles.search}>
//          <input ref="input" className={styles.input} type="text" />
       
//           <i className={styles.icon} onClick={this.inputSubmit} />
//        </div>

//       </div>
//       );
//   }
// }
// export default NewSearch;
