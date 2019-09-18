import React from 'react'
import {showModal} from './addAllocation'
import {convertToHM,convertToTime} from './dateUtils'
import moment  from 'moment'
function Item(el){
    let style = {background:"#ffcc66",borderRadius:'5px',cursor:'pointer',textAlign:'left',padding:'10px',marginBottom:'15px'}
    style = {...style,...el.style}
    let classroom = '无'
    if(el.attachmentRecords){
        classroom = Object.keys(el.attachmentRecords).map((ele,ind)=>{
            return el.attachmentRecords[ele][0].classroomAddress
        }).join(',')
    }
    return (
        <div onClick={el.onClick} style={style}>
            <div>
                <div style={{color:'#ffffff',fontSize:'18px'}}>{el.courseName}</div>
                <div style={{color:'#ffffff',fontSize:'13px'}}>{moment(el.schoolBeginTime).format('M月D日')} - {moment(el.schoolEndTime).format('M月D日')}</div>
                <div style={{color:'#ffffff',fontSize:'13px'}}>{convertToHM(el.courseBeginTime)}-{convertToHM(el.courseEndTime)}</div>
                <div style={{color:'#ffffff',fontSize:'13px'}}>人数:{el.enrolls||0}</div>
                <div style={{color:'#ffffff',fontSize:'13px'}}>教室:{classroom}</div>
            </div>
        </div>
    )
}
function loop(data,week){
    if(!data[week]) return null
    return data[week].map((el,ind)=>{
        if(el.hasClassroom) {
            return <Item {...el} key={ind} style={{background:"#49a7ed",cursor:'initial'}}/>
        }else{
            return <Item {...el} key={ind} onClick={()=>showModal(el.classroomAssignmentId,el)} />
        }
    })
}
export default props=>
  [
    {
        title: '星期一',
        dataIndex: 'MON',
        width: 250,
        render(MON,record,index){
            return loop(props.data,'MON')
        }
    },
    {
        title: '星期二',
        dataIndex: 'TUE',
        width: 250,
        render(TUE,record,index){
            return loop(props.data,'TUE')
        }
    },
    {
        title: '星期三',
        dataIndex: 'WED',  
        width: 250,
        render(WED,record,index){
            return loop(props.data,'WED')        
        }
    },
    {
        title: '星期四',
        dataIndex: 'THU',
        width: 250,
        render(WEN,record,index){
            return loop(props.data,'THU')
        }
    },
    {
        title: '星期五',
        dataIndex: 'FRI',
        width: 250,
        render(WEN,record,index){
            return loop(props.data,'FRI')        
        }
    },
    {
        title: '星期六',
        dataIndex: 'SAT',
        width: 250,
        render(WEN,record,index){
            return loop(props.data,'SAT')        
        }
    },
    {
        title: '星期天',
        dataIndex: 'SUN',
        width: 150,
        render(WEN,record,index){
            return loop(props.data,'SUN')        
        }
    }
    
    
    

    // {
    //   title: '操作',
    //   dataIndex: 'options',
    //   width: 100,
    //   render: (options,record,index) => { 
    //        return  <div>
    //                      <span onClick={()=>{
    //                           
    //                        Model.reduce('collegeSchoolinfo3',state=>({...record}))
    //                       redirect('/home/college/schoolinfo/update')}} style={{color:'#1890FF',cursor:'pointer'}}>
    //                         编辑
    //                     </span>
    //                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                       <Popconfirm title="是否确定删除?" onConfirm={() => {
    //                         Model.dispatch({type:'collegeSchoolinfo/deleteSchoolinfo',schoolInfoId:record.schoolInfoId})
                            
    //                       }
    //                       }>
    //                           <a href="#">删除</a>
    //                       </Popconfirm>
    //                 </div>   
    //   }
    // }
]
