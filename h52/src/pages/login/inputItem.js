import React from 'react';
import { connect } from 'dvax';
import Constants from 'utils/constants';
import styles from './index.less';
import { Model } from 'dvax'

class AuthInputItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    // 验证码图片地址
    this.captchaUrl = Constants.SERVER_URL+'captcha';
    this.changeCaptcha = this.changeCaptcha.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  itemClick() {
    this.refs.input.focus();
  }

  inputChange(e) {
      Model.change('authorization',e.target.name,e.target.value)
    // global.dispatch({type: 'authorization/change', key: e.target.name, value: e.target.value});
  }

  changeCaptcha() {
    this.refs.captcha.src = `${this.captchaUrl}?t=${new Date().getTime()}`;
  }

  componentDidMount(){
     this.props.onRef(this)
  }

  render() {

    return (
      <div className={styles.item} onClick={this.itemClick}>
        <i className={styles.icon+' '+styles[this.props.name]} />
        <input className={styles.input}
          ref="input"
          type={this.props.name !== 'password' && this.props.name !== 'checkPassword' ? "text" : "password"}
          placeholder={this.props.plc}
          name={this.props.name}
          value={this.props.value}
          onChange={this.inputChange}
          onKeyUp={(e) => (e.keyCode === 13 && this.props.inputSubmit && this.props.inputSubmit())} />
        {this.props.isWrongInput ? <i className={styles.warningIcon} /> : null}
        {this.props.isWrongInput ? <p className={styles.warningText}>{this.props.warningText}</p> : null}
        {this.props.name === 'code' ? <button className={styles.codeBtn}>获取验证码</button> : null}
        {
          // this.props.name === 'captcha' ? <i className={styles.imgCodePic} /> : null
        }
        {this.props.name === 'captcha' ? <img ref="captcha" className={styles.captchaPic} src={this.captchaUrl} alt="" onClick={this.changeCaptcha} /> : null}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    value: state.authorization[props.name]
  }
}

export default connect(mapStateToProps)(AuthInputItem);
