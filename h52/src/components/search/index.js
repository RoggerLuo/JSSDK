import React from "react";
import styles from './index.less';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      plc: this.props.plc || "真实姓名/手机号码/研究方向"
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    // if(this.state.plc !== nextProps.plc)
    //   this.setState({ plc: nextProps.plc });
    if(this.state.value !== nextProps.value)
      this.setState({ value: nextProps.value });
  }

  inputChange = (e) => {
    this.setState({ value: e.target.value });
    // this.props.inputChange(e.target.value);
  }

  inputKeyUp = (e) => {
    if(e.keyCode === 13)
      this.inputSubmit();
  }

  inputSubmit = () => {
    this.props.inputSearch && this.props.inputSearch(this.refs.input.value);
  }

  inputReset = () => {
    this.setState({ value: '' });
    this.props.inputSearch && this.props.inputSearch('');
  }

  render() {
    return (
      <div className={styles.search}>
        <input ref="input" className={styles.input} type="text" placeholder={this.state.plc} value={this.state.value} onChange={this.inputChange} onKeyUp={this.inputKeyUp} />
        { this.state.value ? <button className={styles.searchReset} onClick={this.inputReset} /> : '' }
        <i className={styles.icon} onClick={this.inputSubmit} />
      </div>
    );
  }
}

export default Search;
