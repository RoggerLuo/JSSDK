import React from 'react'
import { Model } from 'dvax'
import png from './x.png'
import styled from 'styled-components'
const TagView = styled.div`
    display: inline-block;
    background-color: #1a98ff1a;
    background-color: rgba(26, 152, 255, 0.1);
    color: #333333;
    border-radius: 15px;
    padding: 5px 20px;
    margin-right: 10px;
    margin-top: 10px;
    cursor:pointer;
    font-size: 14px;
`
function onClick(name){
    Model.run('favorModal',function*({ fetch, get, change, reduce }){
        let value = get().textarea
        if(value === '') {
            value = name           
            yield change('textarea',value)  
        }
    })
}

function Tag({ selectedArr,name }) {
    let style = {}
    if(selectedArr.indexOf(name) !== -1) {
        style = {backgroundColor:'#1a98ff',color:'white'}
        return (
            <TagView style={style}>
                {name}
            </TagView>
        )
    }
    return (
        <TagView onClick={()=>onClick(name)}>
            {name}
        </TagView>
    )
}

export default Tag
