import React from 'react'
import { Model } from 'dvax'
import './Components.css'


// class UsersSelect extends React.Component {
 
//   componentDidMount() {
//     Model.dispatch({ type: 'sectors/getSector' })

//   }
//  submit(){
//   debugger
//   Model.dispatch({type:'UsersAdd/getUsersAdd'})
//  }

//   render() {
//     const sectorLists=this.props.sectorList
//     return (
//       <div>
     
        
//       </div>
//     );
//   }
// }

// export default Model.connect(['sectors','sendpostModel','UsersAdd'])(UsersSelect);



{/*<div className="list-block">

         <ul>
          <li>
            <a href="#" className="item-link smart-select" data-open-in="popup" 
                >
              <select name="sectors" onChange={(value)=>{
                const values=event.target.value
                Model.change('sendpostModel','body.subjectId',values)
              }}>
              {
                  this.props.sectorList.map((list,index)=>{

                      return <option value={list._id} key={index}>{list.name}</option>
                  })
              }
              </select>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title"><div style={{fontSize:'14px'}}>用户选择</div></div>
                </div>
              </div>
            </a>
          </li>
        </ul>
        </div>*/}
import { Modal, List, Button, WhiteSpace, WingBlank,SearchBar } from 'antd-mobile';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
const UsersSelect=(props)=>{

 const onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

    return (
      <WingBlank>
        <Button onClick={()=>{
          Model.change('UsersAdd','modal',true)
        }}>请选择用户</Button>
        <WhiteSpace />
        <Modal
          popup
          style={{width:'100%',height:'100%'}}
          visible={props.modal}
          onClose={()=>{
            Model.change('UsersAdd','modal',false)
          }}
          animationType="slide-up"
        >
          <List renderHeader={() => <SearchBar placeholder="Search" maxLength={8} onSubmit={(value)=>{
             
             Model.change('UsersAdd','query.searchValue',value)
             Model.dispatch({ type: 'UsersAdd/getSearchUsers' })
          }} />} className="popup-list">
            {

              props.userInfo.map((users,index)=>{
                  return <List.Item key={index} onClick={()=>{
                    // Model.change('UsersAdd','color',true)
                    Model.change('UsersAdd','modal',false)
                    Model.change('UsersAdd','query.userId',users.userId)
                    Model.change('UsersAdd','username',users.nickname)
                 } }>{users.nickname}</List.Item>
                
              })
            }
            <List.Item>
              <Button type="primary" onClick={()=>{
                Model.change('UsersAdd','modal',false)
              }} style={{background:'#ffe400',border:'0px solid'}}>取消</Button>
            </List.Item>
          </List>
        </Modal>
      </WingBlank>
    );

}

export default Model.connect('UsersAdd')(UsersSelect);