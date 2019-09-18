import React from 'react'
import { Model } from 'dvax'
import { Tabs, WhiteSpace } from 'antd-mobile';

const tabs = [
  { title: '全部' },
  { title: '只看楼主' },
];

function TabComment(){
  return (
        <div>
            <div className="navbar">
          <div className="navbar-inner">
            <div className="center">
              <div className="buttons-row">
                <a href="#tab1" className="tab-link active button">Tab 1</a>
                
                <a href="#tab2" className="tab-link button">Tab 2</a>
                
                <a href="#tab3" className="tab-link button">Tab 3</a>
              </div>
            </div>
          </div>
        </div>
        <div className="pages">
          <div className="page">
           
            <div className="page-content tabs">
              
              <div id="tab1" className="tab active">
                <div className="content-block">
                  <p>This is tab 1 content</p>
                  fffffffffffff
                </div>
              </div>
              
              <div id="tab2" className="tab">
                <div className="content-block">
                  <p>This is tab 2 content</p>
                  333333333
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
}

export default TabComment;