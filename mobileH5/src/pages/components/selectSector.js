import React from 'react'
import { Model } from 'dvax'
import './Components.css'
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';

class SelectSector extends React.Component {
 
  componentDidMount() {
    Model.dispatch({ type: 'sectors/getSector' })

  }
 

  render() {
    const sectorLists=this.props.sectorList
    return (
      <div className="list-block" style={{margin:'auto'}}>
        <ul>
          <li>
            <a className="item-link smart-select">
              <select name="sectors" onChange={(value)=>{
                const values=event.target.value
                Model.change('sendpostModel','body.subjectId',values)
              }}>
              {
                  sectorLists.map((list,index)=>{
                      return <option value={list._id} key={index}>{list.name}</option>
                  })
              }
              </select>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title subjectnames">板块选择</div>
                  {
                    /*this.props.sectorList.map((obj,ind)=>{
                    if(this.props.body.subjectId==obj._id)
                        return <div className="item-after" value={obj._id} key={ind}>{obj.name}</div>
                    })*/
                  }
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Model.connect(['sectors','sendpostModel'])(SelectSector);



