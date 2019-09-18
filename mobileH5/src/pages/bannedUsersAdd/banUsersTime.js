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
          	console.log(value)
          	const	values=moment(value).format("YYYY-MM-DD HH:mm:ss")
          	const date = new Date(values);
          	const time=date.getTime()
          	Model.change('UsersAdd','time1',value)
          	Model.change('UsersAdd','query.startTime',time)
          	Model.dispatch({type:'UsersAdd/sendStartTime'})
          }}
         value={props.time1}
        >
      	<List.Item arrow="horizontal"><div style={{fontSize:'14px'}}>开始时间</div></List.Item>
        </DatePicker>
        <DatePicker
          mode="time"
          onChange={(value)=>{
          	const	values=moment(value).format("YYYY-MM-DD HH:mm:ss")
          	const date = new Date(values);
          	const time=date.getTime()
          	Model.change('UsersAdd','time2',value)
          	Model.change('UsersAdd','query.endTime',time)
          	Model.dispatch({type:'UsersAdd/sendEndTime'})

          }}
         value={props.time2}
        >
          <List.Item arrow="horizontal"><div style={{fontSize:'14px'}}>结束时间</div></List.Item>
        </DatePicker>
      </List>
    );
  // }
}

export default Times