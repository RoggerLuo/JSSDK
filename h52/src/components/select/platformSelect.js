import React from "react";
import styles from './index.less';
import { Select } from 'antd';
const Option = Select.Option;


class SelectCom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if(this.state.value !== nextProps.value)
      this.setState({ value: nextProps.value });
  }

  render() {
    return (
      <div className={styles.select} style={this.props.width === '100%' ? {width: '100%'} : null}>
        
      <SearchRow>          
                 <div style={{display:'flex'}}>
                     {filterConfig.map((select,i) => {
                        return <Select {...select} value={props[select.name]} handleChange={()=>{}} key={i} />
                    })}
                </div>
                <Search />
                <AddButton onClick={()=>{redirect('/home/user/platform/add')}} > + 添加人员</AddButton>
            </SearchRow>
      </div>
    );
  }
}

export default (SelectCom)
