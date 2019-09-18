import React from "react"
import { Model } from 'dvax'
import { routes } from 'src/routes/config'
import { Menu, Dropdown } from 'antd'
import { clear, getItem } from 'utils/localStorage'
import styles from './index.less'
import Constants from 'utils/constants'
import Guide from './Guide'
import defaultAvatar from './avatar.png'
const menu = (
  <Menu>
    <Menu.Item key="1" onClick={()=>Model.dispatch({type:'authorization/logout'})}>退出</Menu.Item>
  </Menu>
)
/* 
    <Menu.Item key="0" onClick={()=>{}}>
      修改密码
    </Menu.Item>
    <Menu.Divider/>
 */
function Header(){
    return (
        <div className={styles.header}>
            <div className={styles.appName}>
                {/* <i className={styles.logo} /> */}
                {'Yoyo BBS'}
            </div>
            <Guide/>            
            {/* <div className={styles.avatar} style={{backgroundImage:`url(${defaultAvatar})`}}></div> */}
            <Dropdown overlay={menu} trigger={['click']} className={styles.user}>
               <span>
                 {'超级管理员'}
                 <i className={styles.option}/>
               </span>
            </Dropdown>
        </div>
    )
}
export default Header
