import React from "react"
import styled from 'styled-components'
import PrimaryRoute from './PrimaryRoute'
import {Model} from 'dvax'

const List = styled.div`
    width: 160px;
    height: 100%;
    overflow-y: auto;
    background: #2c335a;
    padding: 20px 0;
    box-sizing: border-box;
    color: #8e959b;
    &::-webkit-scrollbar {
      width: 0px;
      background: rgba(0,177,251, 0.1);
    }
`
Model.create({
    namespace:'router',
    state:{unfoldIdx:null}
})

function Aside({ routes }){ 
    return (
        <List>
            {routes.map((route, i) => {
                return <PrimaryRoute route={route} index={i} key={i}/>
            })}
        </List>
    )    
}
export default Aside
