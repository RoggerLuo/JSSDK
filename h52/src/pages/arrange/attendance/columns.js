import React from 'react'
import {Model} from 'dvax'
import {Card, Icon, Avatar} from 'antd'
const { Meta } = Card
import {showModal as showCancelModal} from './cancelModal'
import moment from 'moment'
const del = click => (<div style={{color:'blue'}} onClick={()=>click()}>销假</div>)
const Cancel = (<div style={{color:'#ccc'}}>已销假</div>)

function Item(props){
    function clickDel(){
        showCancelModal(props)
    }
    if(props.state==='CANCEL_VACATION') {
        return (
            <Card
                bodyStyle={{padding:'15px'}}
                style={{ width: '100%', marginTop: 16, textAlign:'left', borderRadius:'6px' }}
                actions={[Cancel]}
            >
                <Meta
                    title={props.platformTeacherName}
                    description={
                        (
                            <div>
                                {moment(props.vacationTime).format('MM月DD日')}
                            <div>
                            </div>
                                {props.remarks}
                            </div>
                        )
                    }
                />
            </Card>
        )
    }
    return (
        <Card
            bodyStyle={{padding:'15px'}}
            style={{ width: '100%', marginTop: 16, textAlign:'left', borderRadius:'6px' }}
            actions={[del(clickDel)]}
        >
            <Meta
                title={props.platformTeacherName}
                description={
                    (
                        <div>
                            {moment(props.vacationTime).format('MM月DD日')}
                        <div>
                        </div>
                            {props.remarks}
                        </div>
                    )
                }
            />
        </Card>
    )
}

function loop(data,dayOfWeek){
    return <div>
    {
        data.filter(el=>el.dayOfWeek === dayOfWeek).map((el,ind)=>{ //
            return (
                <div key={ind}>
                    <Item {...el}/>
                </div>
            )
        })
    }          
    </div>
}

export default props => [
    {
        title: '星期一',
        dataIndex: 'MON',
        width: 150,
        render(MON,record,index){
            return loop(props.data,'MON')
        }
    },
    {
        title: '星期二',
        dataIndex: 'TUE',
        width: 150,
        render(TUE,record,index){
            return loop(props.data,'TUE')
        }
    },
    {
        title: '星期三',
        dataIndex: 'WED',  
        width: 150,
        render(WED,record,index){
            return loop(props.data,'WED')
        }
    },
    {
        title: '星期四',
        dataIndex: 'THU',
        width: 150,
        render(WEN,record,index){
            return loop(props.data,'THU')
        }
    },
    {
        title: '星期五',
        dataIndex: 'FRI',
        width: 150,
        render(WEN,record,index){
            return loop(props.data,'FRI')
        }
    },
    {
        title: '星期六',
        dataIndex: 'SAT',
        width: 150,
        render(WEN,record,index){
            return loop(props.data,'SAT')
        }
    },
    {
        title: '星期六',
        dataIndex: 'SUN',
        width: 150,
        render(WEN,record,index){
            return loop(props.data,'SUN')
        }
    }
]


/* 
                            <div style={{color:'black'}}>
                                {convertToHM(props.courseBeginTime)} &nbsp; - &nbsp;
                                {convertToHM(props.courseEndTime)}
                            </div>
                            <div style={{color:'black'}}>
                                人数: {props.enrolls}
                            </div>
                            <div style={{color:'black'}}>
                                {props.schoolName}
                            </div>
 */