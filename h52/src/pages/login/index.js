import {withRouter} from 'react-router-dom'
import React from 'react';
import { Model } from 'dvax'
import styles from './index.less';
import InputItem from './inputItem';
import { addItem, getItem } from 'utils/localStorage';
import { Message } from 'antd';
import Constants from 'utils/constants';
import {redirect} from 'components/history'
import md5 from 'js-md5'
// import { encrypt } from 'utils/aes';
// import { login } from './auth';
Model.create({
    namespace:'authorization',
    state:{
        username:'',
        password:''
        // username: 'superadmin',
        // captcha: "state.auth.captcha",
        // password: 'admin'
    },
    effects:{
        * logout({fetch}){
            yield fetch('admin-auth/logout')
            redirect('/login')
        }
    }
})

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        captchaRef: null,
        list: [
            {
                name: 'username',
                plc: '请输入账号',
                isWrongInput: false,
                warningText: '请输入正确的账号'
            },
            {
                name: 'password',
                plc: '请输入密码',
                isWrongInput: false,
                warningText: '请输入正确的密码'
            }
        ]
        };
        this.getBtnUnclickFlag = this.getBtnUnclickFlag.bind(this);
        // this.login = this.login.bind(this);
        this.isLogging = false;
    }
    _login=()=>{
        Model.run('authorization',function*({fetch,get}){
            const body = get()
            body.password = md5(body.password)
            // body.domainId = "430edu"
            const res = yield fetch('admin-auth/login',{method:'post',body})
            if(res.hasErrors) {
                alert('登陆错误')
            }else{
                redirect('/home/subject')
            }
        })
    }
  componentDidMount() {
    // let username = process.env.NODE_ENV === 'production' ? '' : 'admin_test';
    // let password = process.env.NODE_ENV === 'production' ? '' : 'admin';
    // this.props.dispatch({type: 'auth/change', key: 'username', value: username});
    // // this.props.dispatch({type: 'auth/change', key: 'captcha', value: ''});
    // this.props.dispatch({type: 'auth/change', key: 'password', value: password});
  }

  getBtnUnclickFlag() {
    return !this.props.username || !this.props.password; //|| !this.props.captcha 
  }

  onRef = (ref)=>{
    if(ref.props.name == 'captcha'){
      this.setState({captchaRef: ref});
    }
  }

  render() {
    return (
      <div className={styles.authPage}>
        <div className={styles.header}>{'Yoyo BBS'}</div>
        <div className={styles.inner}>
          {this.state.list.map(item => <InputItem onRef={this.onRef} key={item.name} {...item} inputSubmit={this._login} />)}
          <button className={styles.btn+' '+styles.login+(this.getBtnUnclickFlag() ? ' '+styles.unactive : '')} onClick={this._login}>登  录</button>
          {
            // 去除注册功能
            // <p className={styles.tips}>如果您还没有账号，请点击 <Link className={styles.link} to="/register">注册 </Link></p>
          }
        </div>
      </div>
    )
  }
}

export default Model.connect('authorization')(withRouter(LoginPage))
