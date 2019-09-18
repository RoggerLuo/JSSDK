import React from 'react'
import { Model } from 'dvax'
import { DatePicker, List } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import moment from 'moment'

function Times(props){
function formatDate(date) {
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  console.log('dateStr',dateStr)
  console.log('timeStr',timeStr)
  return `${dateStr} ${timeStr}`;
}
    return (
      <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
        <DatePicker
          mode="time"
          onChange={(value)=>{
         
          	const	values=moment(value).format("YYYY-MM-DD HH:mm:ss")
          	const date = new Date(values);
          	const time=date.getTime()
          	Model.change('manageModel','time1',value)
          	Model.change('manageModel','query.startTime',time)
          	Model.dispatch({type:'manageModel/sendStartTime'})
          }}
         value={props.time1}
        >
      	<List.Item arrow="horizontal" ><div style={{fontSize:'14px'}}>开始时间</div></List.Item>
        </DatePicker>
        <DatePicker
          mode="time"
          onChange={(value)=>{
          	const	values=moment(value).format("YYYY-MM-DD HH:mm:ss")
          	const date = new Date(values);
          	const time=date.getTime()
          	Model.change('manageModel','time2',value)
          	Model.change('manageModel','query.endTime',time)
          	Model.dispatch({type:'manageModel/sendEndTime'})

          }}
         value={props.time2}
        >
          <List.Item arrow="horizontal" style={{fontSize:'14px'}}><div style={{fontSize:'14px'}}>结束时间</div></List.Item>
        </DatePicker>
      </List>
    );
  // }
}

export default Times